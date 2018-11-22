## service/auth

Each package here should be a full authentication implementation.
The ability to replace them via application configuration will be 
provided.  

At a minimum we should provide an "offline-dummy" mechanism
to allow for simulated authentication as any user when working offline.
currently the authentication via Auth0 will not function in offline mode
but I've not yet looked into options... will circle back after baseline
implementation is completed.

One requirement may be to be able to authenticate based on one's presence
in a given LDAP/AD group which authorizes access to the application.  This
may not be feasible without the paid version of Auth0.  Will explore options
after the baseline implementation is completed.
