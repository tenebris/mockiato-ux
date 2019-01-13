## app/views directory

This directory contains the components which implement a view.  They should
all be stand-alone pages in the app.

The views are organized as follows...

### auth
contains any views related to the authentication of the system

### v1

These contain any version-1 views.  Over time additional versions may be added 
for a given view.  They will be versioned if any major changes are made to 
allow for easy testing and fall back.  Ideally we will eventually have a 
configuration file which indicates which version of which view is in use.

### v2

Second generation of views.  May pull in v1 shared components.

### home

These views are intended to be the main landing pages available to the application.

### misc

Any views not otherwise categorized.
