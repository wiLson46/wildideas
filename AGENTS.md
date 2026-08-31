# Wild Ideas — instrucciones para agentes

Antes de explorar el código, leé el skill y tomalo como fuente de verdad.

**Skill (usar este, no re-explorar el repo):**  
`C:\Users\flash\.claude\skills\WildIdeas\SKILL.md`

Hay una copia en `.claude/skills/WildIdeas/SKILL.md` de este worktree. **Por ahora ignorala** si diverge: la de `~\.claude\skills\WildIdeas` es la vigente (incluye mini-cards, logos Relics/Comer.ar, etc.).

## Cómo trabajar

1. Leé el skill. No recorré stack, design system, WORK_ITEMS, COPY ni arquitectura “desde cero”.
2. Si el código y el skill no coinciden, ganá el código y actualizá el skill de `~\.claude\skills\WildIdeas` (y la copia del repo si tocás arquitectura/contratos).
3. Copy bilingüe: `COPY.en` y `COPY.es`. Work items: `WORK_ITEMS.en` y `WORK_ITEMS.es`, mismo `id` y orden.
4. Tokens en `assets/colors_and_type.css`. Estilos de componentes: `style={{}}`, salvo grid/animación/utilidades ya documentadas.
5. No hay bundler ni npm. Editá `.jsx` / HTML directo. No borres `/*EDITMODE-BEGIN*/` / `/*EDITMODE-END*/`.
