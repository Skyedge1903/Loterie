# Build cette documentation

## Dépendances

- [python3](https://www.python.org/downloads/)
- [sphinx](https://www.sphinx-doc.org/en/master/)
- [make](https://www.gnu.org/software/make/)
- [furo](https://sphinx-themes.org/sample-sites/furo/)
- [myst-parser](https://www.sphinx-doc.org/en/master/usage/markdown.html)
- [sphinxcontrib-mermaid](https://github.com/mgaitan/sphinxcontrib-mermaid)

## Windows

```bash
py -m pip install --upgrade sphinx furo myst-parser sphinxcontrib-mermaid
```

### With venv

```
py -m venv env
.\env\Scripts\activate
py -m pip install --upgrade furo sphinx myst-parser sphinxcontrib-mermaid
```


## Linux

```bash
python3 -m pip install --upgrade sphinx furo myst-parser sphinxcontrib-mermaid
```

### With venv

```bash
python -m venv env
source env/bin/activate
python3 -m pip install --upgrade sphinx furo myst-parser sphinxcontrib-mermaid
```

## HTML

```bash
cd doc
make html
```

Les fichiers html seront dans `doc/build/html`

## Latex (compilateur Latex requis)

```bash
cd doc
make latexpdf
```

Le fichier pdf sera dans `doc/build/latex`

