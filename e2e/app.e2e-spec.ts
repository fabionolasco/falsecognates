import { FalseCognatesPage } from './app.po';

describe('false-cognates App', function() {
  let page: FalseCognatesPage;

  beforeEach(() => {
    page = new FalseCognatesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
