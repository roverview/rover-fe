'use strict';

page('/', landingView.init);
page('/explorer', explorerView.init);
page('/explorer/:rover/results', resultsView.init);
page('/login', loginView.init);
page('/createaccount', createAccountView.init);
page('/accountview/:user', accountView.init);
page('/aboutus', aboutUsView.init);

page();
