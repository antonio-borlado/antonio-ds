# Skill de Claude Code

`antonio-ds/` es la skill que hace que cualquier proyecto de Claude Code use este sistema de diseño.

Instalación (una vez por ordenador), enlazando la skill del repo para que se actualice con `git pull`:

```bash
mkdir -p ~/.claude/skills && ln -sfn "$PWD/skills/antonio-ds" ~/.claude/skills/antonio-ds
```

La skill no contiene el catálogo: en cada uso descarga `REFERENCE.md` de la última versión publicada
(`https://cdn.jsdelivr.net/npm/@antonio-ds/components@<mayor>/dist/REFERENCE.md`), que se genera en cada build
a partir del código (componentes, tokens, iconos). Publicar una versión del DS basta para que todos los proyectos la conozcan.
