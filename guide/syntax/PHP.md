# PHP syntax

`DEFAULT.md` applies to PHP in full and is not repeated here. This file records only
what is specific to PHP.

Counts come from a sweep of **1204 PHP source files** (72 859 lines) under `plugins/`,
excluding `vendor/`, `node_modules/`, `_OLD/`, `webroot/` and generated `tmp/`
directories. View templates under `Templates/` are counted separately and are not the
subject of this file.

---

## 1. Type hints are optional, and mostly absent

**55 % of methods declare a return type** — 1922 of 3446. Parameter hints are used
where they help and omitted where they do not.

```php
// RIGHT — typed where the type is stable and meaningful
public function find(int $id) : ?Article
{
    return $this->table->find()->where(['id' => $id])->first();
}
```

```php
// ALSO RIGHT — untyped where the shape is dynamic
public function apply($config, $options = [])
{
    // …
}
```

Do **not** add type hints to existing signatures as a drive-by improvement. This
mirrors the deliberate loose-typing policy on the TypeScript side: assignment in this
codebase is dynamic, and tightening a signature forces declarations to be updated
everywhere the value flows.

Any guidance claiming type hints are mandatory here was never measured against this
codebase.

---

## 2. `declare(strict_types=1)` is rare

Present in **98 of 1509** files (6.5 %). It is not the house default. Add it only to a
file whose correctness depends on it, and never to an existing file as a cleanup.

---

## 3. Short array syntax, always

```php
// RIGHT
$routes = ['index' => 'articles.index'];
```

```php
// WRONG
$routes = array('index' => 'articles.index');
```

**Not one `array()` call exists in the 1204 PHP source files.** This is absolute.

---

## 4. Constructor property promotion is rare

Only **4 files** use it, for **6 parameters** in total. The prevailing form is an
explicit property declaration plus assignment.

```php
// The prevailing form
class ArticleService
{
    private ArticlesTable $table;

    public function __construct(ArticlesTable $table)
    {
        $this->table = $table;
    }
}
```

Promotion is not wrong, but it is not what this codebase looks like. Match the file
you are editing.

---

## 5. Docblocks

**33 % of methods carry one** — 1137 of 3424. They are used where they add
information, not as a blanket requirement.

The tags actually in use, by frequency:

| Tag | Count | Used for |
|---|---|---|
| `@param` | 976 | Parameter description |
| `@return` | 670 | Return description |
| `@var` | 463 | Property type |
| `@inheritdoc` | 220 | Method inherited unchanged |
| `@throws` | 166 | Documented exception |
| `@method` | 94 | Magic method on a class |
| `@property` | 30 | Magic property on a class |

```php
/**
 * Publish the article and resync dependent menus.
 *
 * @param Article $article
 * @param bool $notify
 * @return bool
 * @throws PublishException
 */
public function publish(Article $article, bool $notify = true) : bool
```

### The generated file header

`@since`, `@copyright` and `@filerevision` appear ~926 times each, always together, in
a file-level header block. It is generated tooling output — leave it alone, and do not
hand-write one into a new file.

---

## 6. Underscore-prefixed methods are CakePHP conventions

`DEFAULT.md` requires `camelCase`, and PHP follows it — 3071 of 3341 methods (92 %).

The **226 `_camelCase` methods** are not a competing style and not legacy. CakePHP
chooses those names, not the author:

| Form | Count | What it is |
|---|---|---|
| `_getFoo()` / `_setFoo()` | most of them | Entity virtual field accessor and mutator. `_getType()` backs `$entity->type`; `_setSlug()` backs `$entity->slug = …` |
| `_initializeSchema()` | 22 | Table schema hook |

```php
// RIGHT — the framework requires this exact name
protected function _getFullName() : string
{
    return $this->first_name . ' ' . $this->last_name;
}
```

**Never rename one.** Renaming `_getFullName()` silently removes the `full_name`
virtual field it backs. A leading underscore is also used more loosely to mark an
internal helper (`_mergeRecursive`, `_setBreadcrumbs`) — follow the file you are in.

### True `snake_case` is procedural, not methods

Only **41** names are genuinely `snake_case`, and **38 of them are in one file** —
`plugins/sx-core/src/Bootstrap/functions.php` — as global helpers (`array_add`,
`array_dot`, `array_collapse`). They are not class methods. Write `camelCase` for
anything you add to a class.

---

## 7. Constants

`UPPER_SNAKE_CASE` — 123 of 132. The nine exceptions are legacy.

```php
// RIGHT
const DEFAULT_LOCALE = 'de';
```

```php
// WRONG
const defaultLocale = 'de';
```

---

## 8. Never use `list()`

`DEFAULT.md` rule 12 covers packed assignment. PHP's older `list()` spelling is not
used anywhere — **zero occurrences** against 53 uses of the `[…]` form.

```php
// RIGHT
[$base_href, $article] = [
    request()->getDomainFromPath($menu), article()->getArticleView($this, $menu->id),
];
```

```php
// WRONG
list($base_href, $article) = [ … ];
```

---

## Related

- Cross-language rules: `DEFAULT.md`
- PHP architecture — plugin structure, controllers, services, models, queries: the
  `php/` folder *(not yet written)*
