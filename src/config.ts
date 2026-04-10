// ── Edit this file to manage the egg hunt ──────────────────────────────────
// Add, remove or rename eggs. The `id` must be unique and should never change
// once the hunt has started (it is used to persist player progress).
// `hint` is optional — leave it out to skip the hint section on an egg.

export interface Egg {
  id: string;
  label: string;
  hint?: string;
}

export interface HuntConfig {
  title: string;
  eggs: Egg[];
}

export const HUNT_CONFIG: HuntConfig = {
  title: "Easter Egg Hunt",
  eggs: [
    { id: "egg-01", label: "Le début de la quête",                            hint: "Littéralement sur ton bureau" },
    { id: "egg-02", label: "Chez Maurice",                                    hint: "Salle Jade" },
    { id: "egg-03", label: "Let's gong",                                      hint: "Près du gong et des hamacs" },
    { id: "egg-04", label: "Ptit 🏓?",                                        hint: "Les balles de ping pong" },
    { id: "egg-05", label: "Zineb ou Pamela ?",                               hint: "Bureau Robin" },
    { id: "egg-06", label: "L'œuf, dans la plante 🌷, dans la fleur",         hint: "Salle Tulipe" },
    { id: "egg-07", label: "Atchoum 🌾",                                      hint: "Étagère Pollen" },
    { id: "egg-08", label: "Oui allô, elmy que puis-je faire pour vous ? ☕", hint: "Machine à café Service Client" },
  ],
};
