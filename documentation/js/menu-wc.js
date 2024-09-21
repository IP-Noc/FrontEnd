'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">front documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminModule-f30bd076d767b334de78380852101ae0bd0d3ba43e7d6dd9db53cefbba2fb6bcbb80ad18761fad52e219d0e3104093852721d3b4f1b5f2117b7ddcd3a7a5be1e"' : 'data-bs-target="#xs-components-links-module-AdminModule-f30bd076d767b334de78380852101ae0bd0d3ba43e7d6dd9db53cefbba2fb6bcbb80ad18761fad52e219d0e3104093852721d3b4f1b5f2117b7ddcd3a7a5be1e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-f30bd076d767b334de78380852101ae0bd0d3ba43e7d6dd9db53cefbba2fb6bcbb80ad18761fad52e219d0e3104093852721d3b4f1b5f2117b7ddcd3a7a5be1e"' :
                                            'id="xs-components-links-module-AdminModule-f30bd076d767b334de78380852101ae0bd0d3ba43e7d6dd9db53cefbba2fb6bcbb80ad18761fad52e219d0e3104093852721d3b4f1b5f2117b7ddcd3a7a5be1e"' }>
                                            <li class="link">
                                                <a href="components/AddsubmangerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddsubmangerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListclientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListclientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsubmangerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsubmangerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NvclientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NvclientComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link" >AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-4d56418cc228a56fe1ff48e4faac66298791bffb573b2bb44c7c7a48dbc171bd930c7679694a57c6dbd0eed7264bd0507ea5a53cc5592a0e2613776749050aeb"' : 'data-bs-target="#xs-components-links-module-AppModule-4d56418cc228a56fe1ff48e4faac66298791bffb573b2bb44c7c7a48dbc171bd930c7679694a57c6dbd0eed7264bd0507ea5a53cc5592a0e2613776749050aeb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4d56418cc228a56fe1ff48e4faac66298791bffb573b2bb44c7c7a48dbc171bd930c7679694a57c6dbd0eed7264bd0507ea5a53cc5592a0e2613776749050aeb"' :
                                            'id="xs-components-links-module-AppModule-4d56418cc228a56fe1ff48e4faac66298791bffb573b2bb44c7c7a48dbc171bd930c7679694a57c6dbd0eed7264bd0507ea5a53cc5592a0e2613776749050aeb"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChangepwdreqComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChangepwdreqComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckpwdComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckpwdComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReqresetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReqresetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-4d56418cc228a56fe1ff48e4faac66298791bffb573b2bb44c7c7a48dbc171bd930c7679694a57c6dbd0eed7264bd0507ea5a53cc5592a0e2613776749050aeb"' : 'data-bs-target="#xs-injectables-links-module-AppModule-4d56418cc228a56fe1ff48e4faac66298791bffb573b2bb44c7c7a48dbc171bd930c7679694a57c6dbd0eed7264bd0507ea5a53cc5592a0e2613776749050aeb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-4d56418cc228a56fe1ff48e4faac66298791bffb573b2bb44c7c7a48dbc171bd930c7679694a57c6dbd0eed7264bd0507ea5a53cc5592a0e2613776749050aeb"' :
                                        'id="xs-injectables-links-module-AppModule-4d56418cc228a56fe1ff48e4faac66298791bffb573b2bb44c7c7a48dbc171bd930c7679694a57c6dbd0eed7264bd0507ea5a53cc5592a0e2613776749050aeb"' }>
                                        <li class="link">
                                            <a href="injectables/ResetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SessionManagerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionManagerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SocketService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocketService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ClientModule.html" data-type="entity-link" >ClientModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ClientModule-9d0cd9f11cd69df4a22762dca4aff92ebd23a565fbdc514e9a60fdf2766d0a30b2862178ccb1d0df73aa93366a07693f762150a228d105d59818e7529395a384"' : 'data-bs-target="#xs-components-links-module-ClientModule-9d0cd9f11cd69df4a22762dca4aff92ebd23a565fbdc514e9a60fdf2766d0a30b2862178ccb1d0df73aa93366a07693f762150a228d105d59818e7529395a384"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ClientModule-9d0cd9f11cd69df4a22762dca4aff92ebd23a565fbdc514e9a60fdf2766d0a30b2862178ccb1d0df73aa93366a07693f762150a228d105d59818e7529395a384"' :
                                            'id="xs-components-links-module-ClientModule-9d0cd9f11cd69df4a22762dca4aff92ebd23a565fbdc514e9a60fdf2766d0a30b2862178ccb1d0df73aa93366a07693f762150a228d105d59818e7529395a384"' }>
                                            <li class="link">
                                                <a href="components/AddempComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddempComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddnocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddnocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddsubmanagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddsubmanagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CodeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CsvUploadModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CsvUploadModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditnocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditnocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GrafanaConfiguration.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GrafanaConfiguration</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GrafanaEditConfiguration.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GrafanaEditConfiguration</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListempComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListempComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListnocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListnocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsubmanagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsubmanagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServicesaccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesaccountComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-ClientModule-9d0cd9f11cd69df4a22762dca4aff92ebd23a565fbdc514e9a60fdf2766d0a30b2862178ccb1d0df73aa93366a07693f762150a228d105d59818e7529395a384"' : 'data-bs-target="#xs-pipes-links-module-ClientModule-9d0cd9f11cd69df4a22762dca4aff92ebd23a565fbdc514e9a60fdf2766d0a30b2862178ccb1d0df73aa93366a07693f762150a228d105d59818e7529395a384"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ClientModule-9d0cd9f11cd69df4a22762dca4aff92ebd23a565fbdc514e9a60fdf2766d0a30b2862178ccb1d0df73aa93366a07693f762150a228d105d59818e7529395a384"' :
                                            'id="xs-pipes-links-module-ClientModule-9d0cd9f11cd69df4a22762dca4aff92ebd23a565fbdc514e9a60fdf2766d0a30b2862178ccb1d0df73aa93366a07693f762150a228d105d59818e7529395a384"' }>
                                            <li class="link">
                                                <a href="pipes/SafePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SafePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientRoutingModule.html" data-type="entity-link" >ClientRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link" >EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EmployeeModule-7ff1586f2040c3c89ae9e8ea096680a00741ce860c761898e0f26a8e33ff0fdd4dff8bb6b25ce873cab06e53145c94d05be20e37fe562c09b4fde8066d7d86b0"' : 'data-bs-target="#xs-components-links-module-EmployeeModule-7ff1586f2040c3c89ae9e8ea096680a00741ce860c761898e0f26a8e33ff0fdd4dff8bb6b25ce873cab06e53145c94d05be20e37fe562c09b4fde8066d7d86b0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EmployeeModule-7ff1586f2040c3c89ae9e8ea096680a00741ce860c761898e0f26a8e33ff0fdd4dff8bb6b25ce873cab06e53145c94d05be20e37fe562c09b4fde8066d7d86b0"' :
                                            'id="xs-components-links-module-EmployeeModule-7ff1586f2040c3c89ae9e8ea096680a00741ce860c761898e0f26a8e33ff0fdd4dff8bb6b25ce873cab06e53145c94d05be20e37fe562c09b4fde8066d7d86b0"' }>
                                            <li class="link">
                                                <a href="components/EmployeeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeRoutingModule.html" data-type="entity-link" >EmployeeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialExampleModule.html" data-type="entity-link" >MaterialExampleModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ShowgraphsModule.html" data-type="entity-link" >ShowgraphsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ShowgraphsModule-3f0c1a58d5f73b461f7c76ee88a4104a8b2a3dfbcc1714df08e5ca2548814e8776c0fc379f0d0534e16367aeb82f9d940545c9bb001df9f7397b2eb2c494ed2e"' : 'data-bs-target="#xs-components-links-module-ShowgraphsModule-3f0c1a58d5f73b461f7c76ee88a4104a8b2a3dfbcc1714df08e5ca2548814e8776c0fc379f0d0534e16367aeb82f9d940545c9bb001df9f7397b2eb2c494ed2e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ShowgraphsModule-3f0c1a58d5f73b461f7c76ee88a4104a8b2a3dfbcc1714df08e5ca2548814e8776c0fc379f0d0534e16367aeb82f9d940545c9bb001df9f7397b2eb2c494ed2e"' :
                                            'id="xs-components-links-module-ShowgraphsModule-3f0c1a58d5f73b461f7c76ee88a4104a8b2a3dfbcc1714df08e5ca2548814e8776c0fc379f0d0534e16367aeb82f9d940545c9bb001df9f7397b2eb2c494ed2e"' }>
                                            <li class="link">
                                                <a href="components/ShowgraphsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShowgraphsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VideComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShowgraphsRoutingModule.html" data-type="entity-link" >ShowgraphsRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/CodeComponent-1.html" data-type="entity-link" >CodeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashComponent-1.html" data-type="entity-link" >DashComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/APIResponse.html" data-type="entity-link" >APIResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/InstituteData.html" data-type="entity-link" >InstituteData</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtResponse.html" data-type="entity-link" >JwtResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/School.html" data-type="entity-link" >School</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDetails.html" data-type="entity-link" >UserDetails</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel.html" data-type="entity-link" >UserModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompanyService.html" data-type="entity-link" >CompanyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CsrHelperService.html" data-type="entity-link" >CsrHelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GrafanaService.html" data-type="entity-link" >GrafanaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GraphGrafanaService.html" data-type="entity-link" >GraphGrafanaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HelperService.html" data-type="entity-link" >HelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link" >LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenService.html" data-type="entity-link" >RefreshTokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedService.html" data-type="entity-link" >SharedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/JwtRefreshInterceptor.html" data-type="entity-link" >JwtRefreshInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminOnlyGuard.html" data-type="entity-link" >AdminOnlyGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CompanyGuard.html" data-type="entity-link" >CompanyGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/DoctorGuard.html" data-type="entity-link" >DoctorGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/EmployeGuardGuard.html" data-type="entity-link" >EmployeGuardGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/InstituteGuard.html" data-type="entity-link" >InstituteGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ManagerGuard.html" data-type="entity-link" >ManagerGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Alert.html" data-type="entity-link" >Alert</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComboBoxType.html" data-type="entity-link" >ComboBoxType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Complaint.html" data-type="entity-link" >Complaint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConvertedDates.html" data-type="entity-link" >ConvertedDates</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConvertedDates-1.html" data-type="entity-link" >ConvertedDates</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Doctor.html" data-type="entity-link" >Doctor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Item.html" data-type="entity-link" >Item</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Monitor.html" data-type="entity-link" >Monitor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NocRoom.html" data-type="entity-link" >NocRoom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StepsData.html" data-type="entity-link" >StepsData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubTask.html" data-type="entity-link" >SubTask</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Target.html" data-type="entity-link" >Target</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Target-1.html" data-type="entity-link" >Target</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Variable.html" data-type="entity-link" >Variable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Variable-1.html" data-type="entity-link" >Variable</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});