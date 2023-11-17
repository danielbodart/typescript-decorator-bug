To see the bug either run `./run` which will install asdf, deno, node, typescript and esbuild 
and display the bug in all of them (I originally though it was a bundling issue).

Or you can just run/bundle yourself `index.ts`.

The bug is basically that decorator return types are not type checked and so if the decorator 
returns the target object (instead of the PropertyDescriptor) and that target object has a property called value, it will
be execute before the object has been constructed.