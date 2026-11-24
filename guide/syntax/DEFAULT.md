# Default syntax rules

**These rules hold in every language in this repository.** The language files under
`syntax/` record only their additions and departures — they never repeat what is here.
To know a language's syntax you read this file and that language's file, and nothing
else.

Every rule below was measured in both PHP and TypeScript. Counts come from full sweeps
of `plugins/`, excluding `vendor/`, `node_modules/`, `_OLD/`, `webroot/` and generated
`tmp/` directories: **1204 PHP source files** (72 859 lines) and **708 TypeScript
files** (47 157 lines).

## What the layout rules are for

Code is read by people before it is run by machines, and people read it the way they
read a book. A printed page has lines that are not equal in length but close to one
another; the eye moves down a steady column instead of jumping between a very long
line and a very short one. The layout rules in this file — packing, literal blocks,
argument spreads, the flow rule — are instructions for producing that page: no single
line carrying a whole paragraph of code, no wall of short lines with nothing to hold
on to, and a block wherever a value has room to breathe. Rule 10 says there is no
column limit, and that is true; the aim is not a limit but an even texture.

---

## 1. Indent with 4 spaces

Never tabs.

```php
class ArticleService
{
    public function find(int $id)
    {
        return $this->table->get($id);
    }
}
```

| Language | 4 spaces | 2 spaces | Tabs |
|---|---|---|---|
| PHP | 14 367 | 0 | 3 |
| TypeScript | 10 922 | 0 | 0 |

Three tab-indented PHP lines are the only exceptions in the entire repository.

---

## 2. Allman braces on declarations

The opening brace of a **class, interface, trait or method** goes on its own line, at
the indentation of the declaration. A function that stands alone outside a class is
the exception; rule 15 gives it the brace on the signature line.

```php
// RIGHT
class ArticleService
{
    public function find(int $id)
    {
        // …
    }
}
```

```php
// WRONG
class ArticleService {
    public function find(int $id) {
        // …
    }
}
```

| Declaration | PHP Allman | PHP K&R | TypeScript Allman | TypeScript K&R |
|---|---|---|---|---|
| class / interface / trait | 1104 | 17 | 451 | 3 |
| function / method | 3273 | 13 | 1569 | 18 |

---

## 3. K&R braces on control flow

`if`, `else`, `foreach`, `for`, `while` and `switch` keep the brace on the same line.
This is the opposite of rule 2, and it is deliberate — declarations open a block you
scan for, control flow does not.

```php
// RIGHT
if ( $article->isPublished() ) {
    return $article;
}
```

```php
// WRONG
if ( $article->isPublished() )
{
    return $article;
}
```

| Language | K&R | Allman |
|---|---|---|
| PHP | 3843 | 0 |
| TypeScript | 523 | 0 |

There is **no** exception to this rule in either language: not one control structure
in the repository uses an Allman brace.

---

## 4. Spaces inside conditional parentheses

A space after the opening parenthesis and before the closing one, in every control
structure.

```php
// RIGHT
if ( ! $article ) {
foreach ( $articles as $article ) {
while ( $queue->hasItems() ) {
```

```php
// WRONG
if (!$article) {
foreach ($articles as $article) {
```

| Language | Spaced | Tight |
|---|---|---|
| PHP | 3675 | 185 |
| TypeScript | 536 | 6 |

This applies to **conditionals only**. Ordinary function calls and declarations use
tight parentheses: `$this->find($id)`, not `$this->find( $id )`.

---

## 5. Space after the negation operator

```php
// RIGHT
if ( ! $article->isPublished() ) {
```

```php
// WRONG
if ( !$article->isPublished() ) {
```

| Language | Spaced | Tight | Share |
|---|---|---|---|
| PHP | 1274 | 119 | 91 % |
| TypeScript | 142 | 107 | 57 % |

**Applied inconsistently in TypeScript.** Write the spaced form in new code in both
languages, but do not treat the tight form as a defect when you meet it in existing
TypeScript — it is close to half of what is there.

---

## 6. No blank line after a class opening brace

The first member follows the brace immediately.

```php
// RIGHT
class ArticleService
{
    private array $cache = [];
```

```php
// WRONG
class ArticleService
{

    private array $cache = [];
```

| Language | No blank line | Blank line |
|---|---|---|
| PHP | 1029 | 74 |
| TypeScript | 445 | 6 |

---

## 7. Single-quoted string literals

Use single quotes unless the string needs interpolation or an escape that only double
quotes provide.

```php
// RIGHT
$name = 'article';

// RIGHT — interpolation earns the double quotes
$message = "Article {$article->id} was published";
```

```php
// WRONG
$name = "article";
```

| Language | Single | Double |
|---|---|---|
| PHP | 22 184 | 779 |
| TypeScript | 7896 | 34 |

TypeScript departs from this for **import specifiers only** — see `TYPESCRIPT.md`.

---

## 8. Trailing comma when the elements span lines

**What decides it is whether the elements span lines, not whether the brackets do.**

When each element sits on its own line, the last one carries a comma, so adding the
next element touches one line instead of two.

```php
// RIGHT — one element per line, so the comma is required
$routes = [
    'index'  => 'articles.index',
    'create' => 'articles.create',
    'edit'   => 'articles.edit',
];
```

```php
// WRONG — one element per line and no trailing comma
$routes = [
    'index'  => 'articles.index',
    'edit'   => 'articles.edit'
];
```

When every element shares a single line, no trailing comma is needed — even though the
enclosing brackets are on their own lines:

```php
// RIGHT — both elements on one line, no comma
[$base_href, $article] = [
    request()->getDomainFromPath($menu), article()->getArticleView($this, $menu->id)
];
```

Both forms occur throughout the codebase and both are correct. Do not add a comma to a
one-line element list, and do not report its absence as a defect.

| Language | With trailing comma | Without | Share |
|---|---|---|---|
| PHP | 788 | 179 | 81 % |
| TypeScript | 429 | 285 | 60 % |

**Applied inconsistently in TypeScript.** Write the trailing comma in new code in both
languages; do not treat its absence as a defect in existing TypeScript.

Single-line lists take no trailing comma.

---

## 9. Naming

| Element | Convention | PHP | TypeScript |
|---|---|---|---|
| Class, interface, trait | `PascalCase` | 1123 of 1123 | 453 of 453 |
| Method | `camelCase` | 3071 of 3341 (92 %) | 833 of 895 (93 %) |

Class and interface naming is **universal** — there is not one exception in either
language.

Method naming is `camelCase`. The PHP minority is not a competing style: 226 of the
270 are underscore-prefixed names that **CakePHP dictates** — see `PHP.md`.

Constant naming differs between the languages and is covered in each language's file.

Names are written out in full. No abbreviations, and units belong in the name:
`timeout_ms`, not `timeout`.

---

## 10. There is no line-length limit

Only **280 of 72 859** PHP lines and **29 of 47 157** TypeScript lines exceed 120
characters — but no rule produced that, and none is enforced anywhere in the
repository. Break a line when it stops being readable, not at a column.

Any guidance you find elsewhere claiming a 120-character maximum, a maximum nesting
depth or a cyclomatic-complexity ceiling was never measured against this codebase.
This file supersedes it.

---

## 11. Comments explain why

A comment states the reason, the invariant or the trade-off. It never restates what
the code already says.

```php
// RIGHT — the reason
// Batched at 5 because the ClickUp API rate-limits at 10 req/sec.
$chunks = array_chunk($tasks, 5);
```

```php
// WRONG — restates the code
// Chunk the tasks into groups of 5
$chunks = array_chunk($tasks, 5);
```

Block comments (`/* … */`) are effectively unused — 75 in PHP, 5 in TypeScript. Use
line comments for prose and docblocks (`/** … */`) for structured documentation; each
language's file covers its docblock conventions.

---

## 12. Pack related assignments, then unpack them

Several assignments that belong together are written as **one destructured
assignment**: the names on the left, the values on the right, one per line or grouped
on one. The reader sees the group as a unit instead of a run of separate statements.

Packing exists to improve flow: it collapses a run of short, single-line assignments
into one statement. It is not a container for values that need several lines of their
own. **Every value in a pack must be a single-line expression.**

```php
// RIGHT
[$bundlePath, $templatePath, $folder] = [
    self::getBundlePath($id), self::getTemplatePath($id), null,
];
```

```php
// WRONG — three statements the reader has to group mentally
$bundlePath = self::getBundlePath($id);
$templatePath = self::getTemplatePath($id);
$folder = null;
```

```ts
// RIGHT — assigning to existing members
[this.view, this.data] = [
    new SxHeaderView(this),
    new SxHeaderData(this),
];

// RIGHT — declaring at the same time
const [lang, short] = [
    data.language, Locale.trans('Shorthand'),
];
```

| Form | PHP | TypeScript |
|---|---|---|
| `[a, b] = [ … ]` — assigning to existing names | 53 | 130 |
| `const` / `let` / `var` `[a, b] = [ … ]` — declaring | — | 13 |

The declaring form splits **5 `const` to 8 `let`** (no `var`). Neither is required:
there is no rule preferring `const`, and a `let` that is never reassigned is not a
defect. Often the `let` is there because the binding *is* reassigned later — but do not
read that as a convention.

Layout follows rule 8: the opening `[` stays on the assignment line, the values are
indented one level, and the closing `];` sits at the statement's indentation.

**Use it for values that genuinely belong together** — a view and its data, a path
triple, a pair of accumulators. Do not pack unrelated assignments to save lines; that
costs the reader more than it saves.

**Constructors pack sparingly.** A run of `this.foo = foo;` assignments in a
constructor is the normal shape and is left alone. Pack only when there are very few
of them — two or three — and then as a block like any other pack. Rule 14 has the
reasoning and the example.

**Do not pack a value that would be multi-line on its own.** An object literal with
several keys, a nested array, a closure, a chained call — each of these already spans
lines when written as a plain assignment, and packing it only hides the value's shape
behind the pack's layout. Once any value in the group needs more than one line, write
the whole group as separate statements. Packing is for shortening what is already
short, never for folding something long into a group.

```ts
// WRONG — the first value is a two-field object that wants its own lines
const [index, roots] = [
    { by_basename: new Map<string, string>(), ambiguous: new Map<string, string[]>() }, [join(layout.usr, 'lib')],
];
```

```ts
// RIGHT — separate statements; each value keeps its natural shape
const index = {
    by_basename: new Map<string, string>(),
    ambiguous: new Map<string, string[]>(),
};

const roots = [
    join(layout.usr, 'lib'),
];
```

The test is simple: if a value would be written across several lines as a standalone
assignment, it does not belong in a pack.

### The same idea for arguments

A call whose arguments are long or numerous packs them the same way, with a spread.
Rule 14 also uses this form to break a run of single-line statements when no closure
or literal is available.

```php
// PHP — 7 sites
$keys = array_merge(...[
    array_keys(array_filter($filter, $filterFields)),
    array_keys(array_filter($values, $filterFields)),
]);
```

```ts
// TypeScript — 73 sites
const App = Vue.createApp(...[
    CoreBackend
]);
```

This keeps each argument on its own line without the ragged indentation that a plain
multi-line call produces.

---

## 13. Array and object literals span lines

An array or object literal that is **assigned, returned, stored as a property value,
or passed as an argument** spans lines as soon as it has at least one entry: the
brackets sit on their own lines and the entries are indented one level. This holds
even when the whole literal would fit on one line.

The reason is rule 14. A literal written inline makes the statement a single line,
and a single line is what we avoid whenever the value has a good multi-line form. A
literal always has one. The block also reads as a list, and the opening line then
shows the name or call alone instead of name and contents at once.

How the elements are laid out inside the block depends on what they are:

- **Calls and expressions** go one per line, with the trailing comma from rule 8.
- **Short entries** — string, number and template literals, bare identifiers,
  spreads — share one indented line, with no trailing comma (rule 8). They split to
  one per line, with the trailing comma, when the shared line would run well past
  the lines around it; two long template literals split, three short strings do not.

```ts
// RIGHT — calls, one per line
const roots = [
    join(layout.usr, 'lib'),
    join(layout.usr, 'lib64'),
];

// RIGHT — one element, still in its own block
const roots = [
    join(layout.usr, 'lib'),
];

// RIGHT — short scalars grouped on one line
const extensions = [
    'so', 'dylib', 'a'
];

// RIGHT — two long templates would make one long line, so they split
const architecture_flags = [
    `-arch ${toolchain.host_architecture}`,
    `-mmacosx-version-min=${MinimumMacosVersion}`,
];
```

```ts
// WRONG — the literal is a list and is laid out as one
const roots = [join(layout.usr, 'lib')];
const extensions = ['so', 'dylib'];
```

```ts
// WRONG — short scalars scattered over lines for no gain
const extensions = [
    'so',
    'dylib',
];
```

```php
// RIGHT — PHP follows the same rule
$routes = [
    'index' => 'articles.index',
];
```

The same layout applies in a `return` and as an object property value:

```ts
return [
    join(layout.usr, 'lib'),
];

const config = {
    roots: [
        join(layout.usr, 'lib'),
    ],
};
```

### Empty arrays stay on one line

There is nothing to group. `const roots = [];` is correct.

### Nested arrays: the outer one spans lines, the rows stay flat

When an array holds arrays, the outer literal is broken down and each inner array is
one row on one line, provided its elements are short and simple. Breaking the rows
down as well scatters each group over several lines and hides the row structure that
the nesting exists to show.

```ts
// RIGHT — each row is one visual unit
const pairs = [
    ['usr', join(layout.usr, 'lib')],
    ['opt', join(layout.opt, 'lib')],
];
```

```ts
// WRONG — the rows are no longer visible as rows
const pairs = [
    [
        'usr',
        join(layout.usr, 'lib'),
    ],
    [
        'opt',
        join(layout.opt, 'lib'),
    ],
];
```

A row whose elements are themselves long or nested is broken down like any other
array literal; the rows around it stay flat.

### Arguments get the same block

An array or object literal passed as a call argument is laid out exactly like an
assigned one. The closing bracket and the remaining arguments share the line with the
call's closing parenthesis. This holds even when the call is the only statement in the
body — see rule 14 on lone statements — and a long argument list is one more reason
to do it.

```ts
// RIGHT — array argument, short entries on one line
await this.exec([
    './configure', `--prefix=${this.install_dir}`, ...args
], options);

// RIGHT — object argument, named keys one per line
mkdirSync(dirname(target), {
    recursive: true,
});
```

```ts
// WRONG — the literal is squeezed into the call line
await this.exec(['./configure', `--prefix=${this.install_dir}`, ...args], options);
mkdirSync(dirname(target), { recursive: true });
```

### Object literals: named keys one per line, spreads share a line

The element rule carries over. Named keys go one per line with the trailing comma.
Entries that are only spreads share one indented line with no trailing comma.

```ts
// RIGHT
return runCommand(command, {
    cwd: options.cwd || this.source_dir,
    env: env,
    log_file: this.log_file,
});

const env = {
    ...this.env, ...(options.env || {})
};
```

### A composite value inside a literal is hoisted first

A property value that is itself an object, an array, or a merge of several objects
does not sit inside the enclosing literal. It is assigned to a named local first, and
the property points at that name. A literal whose values are each one simple
expression is read in one pass; one that nests another literal is not.

The property is written out as `key: value` even when the name repeats.

```ts
// RIGHT
const env = {
    ...this.env, ...(options.env || {})
};

return runCommand(command, {
    cwd: options.cwd || this.source_dir,
    env: env,
    log_file: this.log_file,
});
```

```ts
// WRONG — a literal nested in a literal
return runCommand(command, {
    cwd: options.cwd || this.source_dir,
    env: { ...this.env, ...(options.env || {}) },
    log_file: this.log_file,
});
```

### Inline operands stay on one line

A literal that is an operand inside a larger expression, rather than a value in its
own right, is not broken down: a membership test, a default parameter value, a
ternary branch.

```ts
// RIGHT
if ( ['so', 'dylib'].includes(extension) ) {

function scan(roots = []) {
```

---

## 14. Avoid single-line statements where a multi-line form exists

Code reads best when it flows, like the even column of a printed page described at
the top of this file. A run of single-line statements is a wall the eye slides over;
a block with an indented body gives the reader somewhere to rest and shows the
statement's structure. Most layout rules in this file — packing (rule 12),
literal blocks (rule 13), argument spreads — exist to produce that shape. This rule
states the principle they serve, and it applies to every language here.

**The trigger:** a single-line statement that has another single-line statement
directly before or after it, with or without a blank line between. **A statement
that stands alone in a body counts as triggered**: treat it as if single lines
surrounded it. **The action:** write the statement in its multi-line form when it has
a good one, until no two single lines are left adjacent.

In a run of two, expanding one of them is enough; take the one with the longer
argument list. In a run of three or more, expand every statement that has a form.
Alternating single lines and blocks down a long run reads as jitter, and a run of
blocks with blank lines between them reads as a steady column of nearly equal lines
— the texture from the top of this file.

A single line that sits **between two blocks** is not triggered. The blocks already
give the sequence its shape, and the line reads as the hinge between them.

Consecutive blocks are fine. A body made of nothing but blocks is still read block by
block.

### The multi-line forms, in order of preference

1. **A literal gets its block.** Array or object, assigned or passed — rule 13.
2. **A closure gets a braced body.** A one-expression arrow or closure becomes a
   braced body with the expression as its one statement.
3. **A packed assignment gets its block.** The values go on their own indented line
   — rule 12. A pack is never written on one line.
4. **A ternary becomes default-then-override.** Assign the default, then an `if`
   that overrides it. Both forms are allowed; the `if` is chosen when the ternary
   would be one of two adjacent single lines.
5. **A compound boolean becomes guard clauses.** A `return a && b;` is written as one
   `if` per condition returning early, then the final `return`. One condition per
   `if`; this is also plainer to read.
6. **A plain call takes the argument spread.** `fn(...[ a, b ])` with the arguments
   on their own indented line — rule 12. This is the fallback when the statement has
   none of the forms above. It applies to a call with two or more arguments and to a
   call whose single argument is itself an expression, such as `dirs.unshift(...[
   join(prefix, 'lib') ])`. In TypeScript, check that the callee does not pick an
   overload from a literal argument, since the spread widens `'utf8'` to `string`
   and loses that overload.

A statement that has none of these — a bare `return`, an `await` on a property, a
call whose only argument is a bare name or literal like `clearTimeout(killer)` —
stays single. A run made only of such statements is left alone; there is no rule to
invent a wrapper just to get a block.

### Examples

```ts
// RIGHT — lone statement in a body, so the array argument takes its block
async make(args : string[] = [], options : ExecOptions = {}) : Promise<void>
{
    await this.exec([
        '/usr/bin/make', `-j${this.toolchain.job_count}`, ...args
    ], options);
}
```

```ts
// RIGHT — the closure body breaks the run; the two lines after it cannot expand
this.child.kill('SIGTERM');

const killer = setTimeout(() => {
    this.child.kill('SIGKILL');
}, grace_ms);

await this.child.exited;

clearTimeout(killer);
```

```ts
// RIGHT — default-then-override instead of a ternary, so the next line sits between blocks
let absolute = join(this.source_dir, path);

if ( isAbsolute(path) ) {
    absolute = path;
}

const content = readFileSync(absolute, 'utf8');

if ( ! content.includes(search) ) {
    throw new Error(`"${search}" not found in ${absolute}`);
}
```

```ts
// WRONG — a ternary and a call, two single lines back to back
const absolute = isAbsolute(path) ? path : join(this.source_dir, path);
const content = readFileSync(absolute, 'utf8');
```

```ts
// RIGHT — guard clauses instead of a compound boolean
get running() : boolean
{
    if ( this.child.exitCode !== null ) {
        return false;
    }

    if ( this.child.signalCode !== null ) {
        return false;
    }

    return true;
}
```

```ts
// WRONG — the lone statement stays a single line although it could split
get running() : boolean
{
    return this.child.exitCode === null && this.child.signalCode === null;
}
```

```ts
// RIGHT — a run of five, so every statement that can expand does
const prefix = join(...[
    layout.opt, name
]);

include_dirs.unshift(...[
    join(prefix, 'include')
]);

library_dirs.unshift(...[
    join(prefix, 'lib')
]);
```

```ts
// WRONG — five single lines of uneven length, nothing to rest on
const prefix = join(layout.opt, name);

include_dirs.unshift(join(prefix, 'include'));
library_dirs.unshift(join(prefix, 'lib'));
pkgconfig_dirs.unshift(join(prefix, 'lib', 'pkgconfig'));
bin_dirs.unshift(join(prefix, 'bin'));
```

```ts
// RIGHT — a run of two, so one spread is enough; the longer call takes it
const log = openSync(options.log_file, 'a');

writeSync(...[
    log, `\n=== start ${command.join(' ')}\n`
]);
```

```ts
// WRONG — two single lines, and the second could have carried the spread
const log = openSync(options.log_file, 'a');

writeSync(log, `\n=== start ${command.join(' ')}\n`);
```

A multi-line block is followed by a blank line before the next statement, so the
block stands apart from what follows it.

### Exception: constructors

A constructor that copies its parameters onto the instance is a list by nature, and a
list of `this.foo = foo;` lines is read as one. Do not break it up for rhythm, and do
not pack it to shorten it. Packing is used only when there are very few assignments —
two or three — where one packed statement is the whole constructor body, and the pack
takes its block like any other.

```ts
// RIGHT — many assignments, left as single lines
constructor(scope, view, data, options)
{
    this.scope = scope;
    this.view = view;
    this.data = data;
    this.options = options;
}

// RIGHT — very few, packed
constructor(layout, env, log_file)
{
    [this.layout, this.env, this.log_file] = [
        layout, env, log_file
    ];
}
```

---

## 15. A brace that opens a body of several statements is followed by a blank line

Every K&R-braced block — a standalone function, a closure, a loop, a conditional, a
`try` with its `catch` and `finally`, a `switch` — opens with **one blank line** when
its body holds **more than one statement**. A body that is a single statement stays
tight against the brace, however many lines that statement takes: a nested loop, a
multi-line call, a literal block. This is one rule for every language and every kind
of block; there is no separate case for functions, closures or loops.

The reason is the header. When several statements follow the header the eye needs a
gap to tell where the header stops and the sequence begins. A single statement is
read together with its header as one unit — `for … { for … }` is one nested thing,
not a header and a list — and a gap would only pull them apart.

Classes and methods are not affected. Their Allman brace (rule 2) already puts an
empty-looking line between header and body, so rule 6 keeps the body tight.

A function that is not a class member — a module-level `function`, a free PHP
function — opens its brace **on the signature line**, not on its own, so that this
rule applies to it. That is the one departure from rule 2.

```ts
// RIGHT — standalone function, multi-line body
export function orderFormulas(registry : Map<string, Formula>, wanted : string[]) : Formula[] {

    const [ordered, done, visiting] = [
        [] as Formula[], new Set<string>(), new Set<string>()
    ];

    const visit = (name : string, chain : string[]) => {

        if ( done.has(name) ) {
            return;
        }
```

```ts
// RIGHT — two statements after the outer brace, one statement after the inner ones
for ( const formula of formulas ) {

    const dependencies = [
        ...formula.deps, ...(formula.opt_prefixes || [])
    ];

    for ( const dependency of dependencies ) {
        if ( ! registry.has(dependency) ) {
            throw new Error(`Formula ${formula.name} depends on unknown formula ${dependency}`);
        }
    }
}
```

```ts
// RIGHT — a single multi-line statement stays tight, like a single one-line statement
for ( const directory of directories ) {
    mkdirSync(directory, {
        recursive: true,
    });
}

for ( const name of wanted ) {
    visit(name, []);
}
```

```ts
// RIGHT — several statements, so the gap, at every level that has several
if ( kind === 'dylib' ) {

    const id = await readDylibId(path);

    if ( classifyReference(id, layout) !== 'internal' ) {

        await setDylibId(...[
            path, path, log_file
        ]);

        rewrites += 1;
    }
}
```

```php
// RIGHT — the same in PHP
function order_formulas(array $registry, array $wanted) {

    $ordered = [];

    foreach ( $wanted as $name ) {
        visit($name, []);
    }
}
```

```ts
// WRONG — several statements pressed against the header
for ( const formula of formulas ) {
    const dependencies = [
        ...formula.deps, ...(formula.opt_prefixes || [])
    ];

    for ( const dependency of dependencies ) {
```

```ts
// WRONG — a gap over a single statement
for ( const root of roots ) {

    for ( const entry of readdirSync(root) ) {
```

```ts
// RIGHT — a method keeps rule 2 and rule 6
async exec(command : string[], options : ExecOptions = {}) : Promise<CommandResult>
{
    const env = {
```

Object, array and type literals are not blocks and take no blank line after their
opening bracket.