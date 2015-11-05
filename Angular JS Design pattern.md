---
title: Module Wise Implementation
...

Introduction

It is very important to have organised and easily pluggable architecture
for every project.

Most of the developers do following mistakes:

-   Maintaining different directories where there is no scope
    of flexibility.

-   Most of them don’t know how many applications can we have
    in project. Most them rely on initiating single application.

-   Having controller names unrelated to purpose it actually created.

-   Unware of Minification while moving to production.

-   Having unrelated names to views.

-   Maintaining test environment in unrelated format, even they confused
    where they kept scripts.

If we are going to build an application where each module as its own
feature and want modules to be easily pluggable (we may enable / disable
modules based on requirement).

Instead of bundling code by the layer to which it belongs (controllers,
services, filters, directives, etc.), I would like to see code bundled
by the feature to which it belongs. There can be many manifestations of
this, but here are two examples:

**(a) Routing**

Instead of something like this for a /**myaccount** route:

|-- src/

| |-- scripts/

| | |-- controllers/

| | | |-- myaccount.js

| |-- test/

| | |-- spec/

| | | |-- controllers/

| | | | |-- myaccount.js

| |-- views/

| | |-- myaccount.html

I'd prefer to see it like this:

|-- src/

| |-- app/

| | |-- myaccount /

| | | |-- myaccount.js

| | | |-- myaccount.spec.js

| | | |-- myaccount.tpl.html

This is a much simpler directory structure, but makes the
“**myaccount”** module very portable. It is also self-contained: it can
be totally refactored without impacting the rest of the application.

**(b) Complex-Component:**

If we have complex component, it is likely composed of multiple smaller
components. For example, an editing component might have a persistence
service, a representation service for translating markup to HTML, and a
directive or two for display. With the existing structure, each
component would be created independently and be mixed throughout the
various layers; without a comprehensive, holistic understanding of the
application, it is difficult to see how these components are (or should
be) inter-related. It demands manually surfing through the code and/or
doing searches for component names.

A cleaner directory structure would look something like this:

|-- src/

| |-- components/

| | |-- editor/

| | | |-- editing.js

| | | |-- editor.js

| | | |-- editor.spec.js

| | | |-- editingStorage.js

| | | |-- editingStorage.spec.js

| | | |-- editingRender.js

| | | |-- editingRender.spec.js

Now it's pretty clear we're talking about one component, albeit a
complex one that spans multiple layers. But each sub-component of the
editor is still standalone, if need be - that's just good programming.

**Isolate the Modules**

A logical extension of this reorganization is to so-define our modules.
In this pattern, each directory roughly corresponds to a module. Instead
of this:

angular.module( 'myApp' )

.controller( 'HomeCtrl', function (\$scope) {

// ...

});

We would have this:

angular.module( 'home', \[\] )

.controller('HomeCtrl', function (\$scope) {

// ...

});

Similarly for the editing component:

angular.module( 'editor', \[

'editing.editor',

'editing.editingStorage',

'editing.editingRender'

\])

Where those modules are defined in their respective files. And our main
app.js file simply requires the top-level modules:

angular.module( 'myApp', \[

'home',

'editing'

\]);

**Modularized Routing**

Using the above example, yo angular:route home would generate this:

|-- src/

| |-- app/

| | |-- home/

| | | |-- home.js

| | | |-- home.spec.js

| | | |-- home.tpl.html

But instead of defining the route in app.js, we would let the home
module set up its own routing:

angular.module( 'home', \[\] )

.config( function ( \$routeProvider ) {

\$routeProvider

.when( '/home', {

templateUrl: 'home/home.tpl.html',

controller: 'HomeCtrl'

});

})

.controller( 'HomeCtrl', function ( \$scope ) {

// ...

})

Nothing is required in the app.js in terms of routing, unless the user
should choose to define a default redirect, such as to /home.

**Feature Nesting**

The existing directory structure is very flat. For small projects, this
is perfectly fine, but for non-trivial projects it can become a file
management nightmare. If we organize our code by the feature or
component they implement and use adjacent templates and tests, it also
makes sense to be able to nest them.

Considering the route example:

|-- src/

| |-- app/

| | |-- products/

| | | |-- products.js

| | | |-- products.spec.js

| | | |-- products.tpl.html

| | | |-- create/

| | | | |-- create.js

| | | | |-- create.tpl.html

| | | |-- ...

In this case, each directory should roughly correspond to a single
"submodule". The products directory is a module called products, making
create something like products.create. Using this pattern, the products
module can require all requisite submodules:

angular.module( 'products', \[

'products.list',

'products.view',

'products.create',

'products.search'

\]);

Again, because the target is reusability, each app module is responsible
for declaring its own dependencies, which will "bubble up" from
products.create to products to myApp. Routing would work similarly; each
submodule can define its own routing, in theory "namespacing" to its
parent module. For example, products.create could define a route of
/products/create.

This same "nested" pattern would also apply to complex components,
though they would obviously not include routing. E.g.:

|-- src/

| |-- components/

| | |-- editor/

| | | |-- editor.js

| | | |-- plugins/

| | | | |-- syntax.js

| | | | |-- align.js

**Internal "Components"**

Lastly, I make a distinction between **app code**, the stuff that is
somewhat unique to our problem domain, and **components**, the stuff
that *may* come from a third party but that is more immediately reusable
in unrelated projects.

With this concept in mind, we should be able to mix in the components
directory the third-party libraries that come from Bower, the
third-party libraries we download manually, and the reusable components
that we are coding for this application specifically. e.g.:

|-- src/

| |-- components/

| | |-- angular-placeholders/ &lt;downloaded&gt;

| | |-- angular-ui-bootstrap/ &lt;bower&gt;

| | |-- editor/ &lt;internal&gt;

**Conclusion:**

Always go for nice design pattern which reduces complexity in
maintaining applications.
