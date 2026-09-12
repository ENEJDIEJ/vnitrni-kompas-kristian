import type { ProgramActivityInput, ProgramStatePayload } from "./program-state";
export function localProgramDate(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`; }
export async function loadProgramState() { return { state: null as ProgramStatePayload | null, revision: 0, updatedAt: null }; }
export async function saveProgramState(_state: ProgramStatePayload) { return { saved: true as const, revision: null, updatedAt: new Date().toISOString() }; }
export async function recordProgramActivity(_input: Omit<ProgramActivityInput,"localDate"> & { localDate?: string }) { return { recorded: false }; }
