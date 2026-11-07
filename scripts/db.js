/**
 * scripts/db.js — Persistencia Dual para FunnelMaster (SQLite por defecto / PostgreSQL opcional).
 *
 * Si DATABASE_URL está definido en el entorno, intenta conectar a Postgres.
 * En caso contrario, usa SQLite local en data/funnel_master.db (cero dependencias).
 */

const fs = require('fs');
const path = require('path');

let sqliteDb = null;
let pgClient = null;
let isPostgres = false;

const DB_DIR = path.join(__dirname, '..', 'data');
const SQLITE_FILE = path.join(DB_DIR, 'funnel_master.db');

function getDbInstance() {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')) {
    isPostgres = true;
    if (!pgClient) {
      try {
        const { Client } = require('pg');
        pgClient = new Client({ connectionString: process.env.DATABASE_URL });
        pgClient.connect();
      } catch (e) {
        console.warn('[db] pg module not installed or connection failed, falling back to SQLite:', e.message);
        isPostgres = false;
      }
    }
    if (isPostgres && pgClient) return { type: 'pg', client: pgClient };
  }

  // SQLite nativo
  if (!sqliteDb) {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    const { DatabaseSync } = require('node:sqlite');
    sqliteDb = new DatabaseSync(SQLITE_FILE);
    try {
      sqliteDb.exec('PRAGMA journal_mode = WAL;');
      sqliteDb.exec('PRAGMA busy_timeout = 5000;');
    } catch (e) {}
  }
  return { type: 'sqlite', client: sqliteDb };
}

function initDb() {
  const db = getDbInstance();

  if (db.type === 'sqlite') {
    db.client.exec(`
      CREATE TABLE IF NOT EXISTS niches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        niche_name TEXT NOT NULL,
        macro_niche TEXT NOT NULL,
        target_avatar TEXT,
        core_pain TEXT,
        active_ads_count INTEGER DEFAULT 0,
        validation_status TEXT DEFAULT 'pending',
        competitor_url TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS offers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        niche_id INTEGER,
        product_name TEXT NOT NULL,
        main_promise TEXT NOT NULL,
        unique_mechanism TEXT,
        bonuses_json TEXT,
        price_usd REAL DEFAULT 0.0,
        guarantee_days INTEGER DEFAULT 30,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (niche_id) REFERENCES niches (id)
      );

      CREATE TABLE IF NOT EXISTS funnels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        status TEXT DEFAULT 'draft',
        target_audience TEXT,
        config_json TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS automation_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        skill_name TEXT NOT NULL,
        action TEXT NOT NULL,
        status TEXT NOT NULL,
        details_json TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    return { success: true, driver: 'sqlite', file: SQLITE_FILE };
  } else {
    // Migración básica Postgres si aplica
    return { success: true, driver: 'postgres' };
  }
}

function saveNiche(nicheData) {
  initDb();
  const db = getDbInstance();

  if (db.type === 'sqlite') {
    const stmt = db.client.prepare(`
      INSERT INTO niches (niche_name, macro_niche, target_avatar, core_pain, active_ads_count, validation_status, competitor_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      nicheData.niche_name || nicheData.nicheName,
      nicheData.macro_niche || nicheData.macroNiche,
      nicheData.target_avatar || nicheData.targetAvatar || '',
      nicheData.core_pain || nicheData.corePain || '',
      nicheData.active_ads_count ?? nicheData.activeAdsCount ?? 0,
      nicheData.validation_status || nicheData.validationStatus || 'validated',
      nicheData.competitor_url || nicheData.competitorUrl || ''
    );
    return { id: info.lastInsertRowid, ...nicheData };
  }
}

function getLatestNiche() {
  initDb();
  const db = getDbInstance();
  if (db.type === 'sqlite') {
    const stmt = db.client.prepare('SELECT * FROM niches ORDER BY id DESC LIMIT 1');
    return stmt.get();
  }
  return null;
}

function getActiveValidatedNiche() {
  initDb();
  const db = getDbInstance();
  if (db.type === 'sqlite') {
    const stmt = db.client.prepare("SELECT * FROM niches WHERE validation_status IN ('super_winner', 'validated', 'scaled') ORDER BY id DESC LIMIT 1");
    return stmt.get();
  }
  return null;
}

function saveOffer(offerData) {
  initDb();
  const db = getDbInstance();

  if (db.type === 'sqlite') {
    const stmt = db.client.prepare(`
      INSERT INTO offers (niche_id, product_name, main_promise, unique_mechanism, bonuses_json, price_usd, guarantee_days)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      offerData.niche_id || 1,
      offerData.product_name || offerData.productName,
      offerData.main_promise || offerData.mainPromise,
      offerData.unique_mechanism || offerData.uniqueMechanism || '',
      typeof offerData.bonuses === 'object' ? JSON.stringify(offerData.bonuses) : (offerData.bonuses_json || '[]'),
      offerData.price_usd || offerData.priceUsd || 47.0,
      offerData.guarantee_days || offerData.guaranteeDays || 30
    );
    return { id: info.lastInsertRowid, ...offerData };
  }
}

function getLatestOffer() {
  initDb();
  const db = getDbInstance();
  if (db.type === 'sqlite') {
    const stmt = db.client.prepare('SELECT * FROM offers ORDER BY id DESC LIMIT 1');
    return stmt.get();
  }
  return null;
}

function logAutomation(skillName, action, status, details = {}) {
  initDb();
  const db = getDbInstance();
  if (db.type === 'sqlite') {
    const stmt = db.client.prepare(`
      INSERT INTO automation_logs (skill_name, action, status, details_json)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(
      skillName,
      action,
      status,
      typeof details === 'object' ? JSON.stringify(details) : String(details)
    );
    return info.lastInsertRowid;
  }
  return null;
}

function closeDb() {
  if (sqliteDb) {
    sqliteDb.close();
    sqliteDb = null;
  }
  if (pgClient) {
    pgClient.end().catch(() => {});
    pgClient = null;
  }
}

module.exports = {
  initDb,
  saveNiche,
  getLatestNiche,
  getActiveValidatedNiche,
  saveOffer,
  getLatestOffer,
  logAutomation,
  closeDb,
  getDbInstance
};
