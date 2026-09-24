import { HABIT_HINTS, runtimeError } from "./errors";
import type { Token } from "./token";
import type { Value } from "./values";

interface Slot {
  value: Value;
  locked: boolean;
}

/** One scope of variables, linked to the scope around it. */
export class Environment {
  private readonly vars = new Map<string, Slot>();

  constructor(readonly parent: Environment | null) {}

  define(name: Token, value: Value, locked: boolean): void {
    if (this.vars.has(name.lexeme)) {
      throw runtimeError(name, `'${name.lexeme}' already exists here. To change it, write: ${name.lexeme} = ...`);
    }
    this.vars.set(name.lexeme, { value, locked });
  }

  /** Defines a name without a source location (built-ins, loop counters). */
  set(name: string, value: Value): void {
    this.vars.set(name, { value, locked: false });
  }

  get(name: Token): Value {
    return this.find(name).value;
  }

  assign(name: Token, value: Value): void {
    const slot = this.find(name);
    if (slot.locked) throw runtimeError(name, `Cannot change locked '${name.lexeme}'`);
    slot.value = value;
  }

  private find(name: Token): Slot {
    for (let env: Environment | null = this; env; env = env.parent) {
      const slot = env.vars.get(name.lexeme);
      if (slot) return slot;
    }
    const hint = HABIT_HINTS[name.lexeme];
    throw runtimeError(
      name,
      hint
        ? `Undefined variable '${name.lexeme}'. ${hint}`
        : `Undefined variable '${name.lexeme}'. Create it first with: pit ${name.lexeme} = ...`,
    );
  }
}
