(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{Yj9t:function(t,n,i){"use strict";i.r(n),i.d(n,"AuthModule",function(){return R});var e=i("ofXK"),a=i("3Pt+"),o=i("rhD1"),r=i("tyNb"),s=i("fXoL"),c=i("qXBG"),u=i("Wp6s"),b=i("Xa2L"),m=i("kmnG"),l=i("qFsG"),d=i("bTqV");function p(t,n){1&t&&s.Ob(0,"mat-spinner")}function g(t,n){1&t&&(s.Sb(0,"mat-error"),s.uc(1,"Please enter a valid email."),s.Rb())}function f(t,n){1&t&&(s.Sb(0,"mat-error"),s.uc(1,"Please enter a valid password."),s.Rb())}function h(t,n){1&t&&(s.Sb(0,"button",9),s.uc(1," Login "),s.Rb())}function S(t,n){if(1&t){const t=s.Tb();s.Sb(0,"form",2,3),s.Zb("submit",function(){s.nc(t);const n=s.lc(1);return s.dc().onLogin(n)}),s.Sb(2,"mat-form-field"),s.Ob(3,"input",4,5),s.tc(5,g,2,0,"mat-error",0),s.Rb(),s.Sb(6,"mat-form-field"),s.Ob(7,"input",6,7),s.tc(9,f,2,0,"mat-error",0),s.Rb(),s.tc(10,h,2,0,"button",8),s.Rb()}if(2&t){const t=s.lc(4),n=s.lc(8),i=s.dc();s.Cb(5),s.ic("ngIf",t.invalid),s.Cb(4),s.ic("ngIf",n.invalid),s.Cb(1),s.ic("ngIf",!i.isLoading)}}function I(t,n){1&t&&s.Ob(0,"mat-spinner")}function v(t,n){1&t&&(s.Sb(0,"mat-error"),s.uc(1,"Please enter a valid email."),s.Rb())}function w(t,n){1&t&&(s.Sb(0,"mat-error"),s.uc(1,"Please enter a valid password."),s.Rb())}function y(t,n){1&t&&(s.Sb(0,"button",9),s.uc(1," Sign Up "),s.Rb())}function L(t,n){if(1&t){const t=s.Tb();s.Sb(0,"form",2,3),s.Zb("submit",function(){s.nc(t);const n=s.lc(1);return s.dc().onSignup(n)}),s.Sb(2,"mat-form-field"),s.Ob(3,"input",4,5),s.tc(5,v,2,0,"mat-error",0),s.Rb(),s.Sb(6,"mat-form-field"),s.Ob(7,"input",6,7),s.tc(9,w,2,0,"mat-error",0),s.Rb(),s.tc(10,y,2,0,"button",8),s.Rb()}if(2&t){const t=s.lc(4),n=s.lc(8),i=s.dc();s.Cb(5),s.ic("ngIf",t.invalid),s.Cb(4),s.ic("ngIf",n.invalid),s.Cb(1),s.ic("ngIf",!i.isLoading)}}const C=[{path:"login",component:(()=>{class t{constructor(t){this.authService=t,this.isLoading=!1}ngOnInit(){this.authStatusSub=this.authService.getAuthStatusListener().subscribe(t=>{this.isLoading=!1})}onLogin(t){t.invalid||(this.isLoading=!0,this.authService.login(t.value.email,t.value.password))}ngOnDestroy(){this.authStatusSub.unsubscribe()}}return t.\u0275fac=function(n){return new(n||t)(s.Nb(c.a))},t.\u0275cmp=s.Hb({type:t,selectors:[["ng-component"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["loginForm","ngForm"],["matInput","","name","email","ngModel","","type","email","placeholder","E-mail","required","","email",""],["emailInput","ngModel"],["type","password","name","password","ngModel","","matInput","","placeholder","Password","required",""],["passwordInput","ngModel"],["type","submit","mat-raised-button","","color","primary",4,"ngIf"],["type","submit","mat-raised-button","","color","primary"]],template:function(t,n){1&t&&(s.Sb(0,"mat-card"),s.tc(1,p,1,0,"mat-spinner",0),s.tc(2,S,11,3,"form",1),s.Rb()),2&t&&(s.Cb(1),s.ic("ngIf",n.isLoading),s.Cb(1),s.ic("ngIf",!n.isLoading))},directives:[u.a,e.k,b.b,a.p,a.j,a.k,m.c,l.a,a.a,a.i,a.l,a.n,a.b,m.b,d.b],styles:["mat-form-field[_ngcontent-%COMP%]{width:100%}mat-spinner[_ngcontent-%COMP%]{margin:auto}"]}),t})()},{path:"signup",component:(()=>{class t{constructor(t){this.authService=t,this.isLoading=!1}ngOnInit(){this.authStatusSub=this.authService.getAuthStatusListener().subscribe(t=>{this.isLoading=!1})}onSignup(t){t.invalid||(this.isLoading=!0,this.authService.createUser(t.value.email,t.value.password))}ngOnDestroy(){this.authStatusSub.unsubscribe()}}return t.\u0275fac=function(n){return new(n||t)(s.Nb(c.a))},t.\u0275cmp=s.Hb({type:t,selectors:[["ng-component"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["signupForm","ngForm"],["matInput","","name","email","ngModel","","type","email","placeholder","E-mail","required","","email",""],["emailInput","ngModel"],["type","password","name","password","ngModel","","matInput","","placeholder","Password","required",""],["passwordInput","ngModel"],["type","submit","mat-raised-button","","color","primary",4,"ngIf"],["type","submit","mat-raised-button","","color","primary"]],template:function(t,n){1&t&&(s.Sb(0,"mat-card"),s.tc(1,I,1,0,"mat-spinner",0),s.tc(2,L,11,3,"form",1),s.Rb()),2&t&&(s.Cb(1),s.ic("ngIf",n.isLoading),s.Cb(1),s.ic("ngIf",!n.isLoading))},directives:[u.a,e.k,b.b,a.p,a.j,a.k,m.c,l.a,a.a,a.i,a.l,a.n,a.b,m.b,d.b],styles:["mat-form-field[_ngcontent-%COMP%]{width:100%}mat-spinner[_ngcontent-%COMP%]{margin:auto}"]}),t})()}];let O=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({imports:[[r.e.forChild(C)],r.e]}),t})(),R=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({imports:[[e.c,o.a,a.g,O]]}),t})()}}]);