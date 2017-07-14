import { TripPage } from './app.po';

describe('trip App', function() {
  let page: TripPage;

  beforeEach(() => {
    page = new TripPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
