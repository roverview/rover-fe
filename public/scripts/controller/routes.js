'use strict';

page('/public', landingView.init);
page('/explorer', explorerView.init);
// page('/explorer/:rover/results', resultsView.init);
page('/login', loginView.init);
// page('/createaccount', createAccountView.init);
// page('/accountview/:user', accountView.init);
// page('/aboutus', aboutUsView.init);

page('*', () => page.redirect('/public'));

page();
