// Minimal typings for Bun's built-in SQLite driver — only the subset the learning store uses
// (src/ai-engine/learning/store.ts). The project doesn't depend on bun-types; this keeps `tsc`
// happy without pulling in the full Bun type surface (which conflicts with the DOM lib the website
// build uses).
declare module 'bun:sqlite' {
  export interface Statement {
    run(...params: any[]): { changes: number | bigint; lastInsertRowid: number | bigint };
    get(...params: any[]): unknown;
    all(...params: any[]): unknown[];
  }
  export class Database {
    constructor(filename?: string, options?: { create?: boolean; readonly?: boolean; readwrite?: boolean });
    query(sql: string): Statement;
    exec(sql: string): void;
    close(): void;
  }
}
