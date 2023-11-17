To see the bug either run `./run` which will install asdf, deno, node, typescript and esbuild 
and display the bug in all of them (I originally though it was a bundling issue).

Or you can just run/bundle yourself `index.ts`.

The bug is basically that decorator return types are not type checked and so if the decorator 
returns the target object (instead of the PropertyDescriptor) and that target object has a property called value, it will
be execute before the object has been constructed.


Example log output:

```
BEGIN Deno test
noop decorator applied to property "works"
noop decorator applied to property "value"
Broken.value getter called before constructor is called, returning "undefined"
Works constructor called with "1"
Works.works getter called, returning "1"
works.works returns "1"
Broken constructor called after getter is called with "1"
broken.value returns "undefined"
END Deno test


BEGIN TSC test
noop decorator applied to property "works"
noop decorator applied to property "value"
Broken.value getter called before constructor is called, returning "undefined"
Works constructor called with "1"
Works.works getter called, returning "1"
works.works returns "1"
Broken constructor called after getter is called with "1"
broken.value returns "undefined"
END TSC test


BEGIN esbuild test

  dist/index.mjs  1.5kb

⚡ Done in 1ms
noop decorator applied to property "works"
noop decorator applied to property "value"
Broken.value getter called before constructor is called, returning "undefined"
Works constructor called with "1"
Works.works getter called, returning "1"
works.works returns "1"
Broken constructor called after getter is called with "1"
broken.value returns "undefined"
END esbuild test


```