// @ts-nocheck
const user = {
	ghosty: "",
	rude: "Fuck Nugget",
	hacky: "<script>alert('XSS')</script>",
	valid: 'Rupert the Wonder Pig'
};

const app = {
	button: {
		landing: 'button[type="submit"]'
	},
	error: {
		warn: 'Please complete the form',
		scold: 'Don\'t be a tit'
	},
	input: {
		date: 'input[type="date"]',
		feel: 'textarea[name="eventDescription"]',
		genre: 'select[id="musicGenre"]',
		name: 'input[type="text"][placeholder="What\'s Your Name?"]'
	}
};

describe('Front-end Tests', () => {
  beforeEach(() => { cy.visit('') })

	context('The Bouncer', () => {
		context('Keeps Out the Riff-Raff', () => {
			it('Ghosty', () => {
				cy.get(app.input.name);
				cy.get(app.button.landing)
					.click();
				cy.get('#error')
					.should('contain', app.error.warn);
			})
			it('Rudey', () => {
				cy.get(app.input.name)
					.type(user.rude);
				cy.get(app.button.landing)
					.click();
				cy.url()
					.should('eq', 'http://localhost:5173/');
				cy.get('#error')
					.should('contain', app.error.scold);
			})
			it('Hacky', () => {
				cy.get(app.input.name)
					.type(user.hacky);
				cy.get(app.button.landing)
					.click();
				cy.url()
					.should('eq', 'http://localhost:5173/');
				cy.get('#error')
					.should('contain', app.error.scold);
			})
		})

		context ('Ushers In VIPs', () => {
			it('Pig', () => {
				cy.get(app.input.name)
					.type(user.valid);
				cy.get(app.button.landing)
					.click();
				cy.contains(user.valid)
					.should('be.visible');
				cy.get('input[type="date"]')
					.should('exist');
			});
		})
	})

	context ('Input Page', () => {
		beforeEach(() => {
			cy.get( app.input.name ).type( user.valid );
			cy.get( app.button.landing ).click();
		});

		context('Form Submission', () => {
			context('Failure States', () => {
				it('App does not advance with an empty date', () => {
					cy.get( app.input.genre )
						.select('rock');
					cy.get( app.input.feel )
						.type('Happy');
					cy.contains('button', 'Generate playlist')
						.click();
					cy.get('.error')
						.should('contain', app.error.warn);
					cy.get( app.input.date )
						.should('exist');
				});

				it('App does not advance with an empty genre', () => {
					cy.get(app.input.date)
					.type('2023-05-01');
					cy.get(app.input.feel)
						.type('Happy');
					cy.get(app.button.input)
						.click();
					cy.get('.error')
						.should('contain', app.error.warn);
					cy.get(app.input.genre)
						.should('exist');
				});

				it('App does not advance with an empty mood', () => {
					cy.get( app.input.date )
						.type('2023-05-01');
					cy.get( app.input.genre )
						.select('rock');
					cy.contains('button', 'Generate playlist')
						.click();
					cy.get('.error')
						.should('contain', app.error.warn);
					cy.get( app.input.feel )
						.should('exist');
				});
			});

			context('Success States', () => {
				it('App makes API Call with a valid date, genre, and mood', () => {
					cy.get( app.input.date )
						.type('2023-05-01');
					cy.get( app.input.genre )
						.select('rock');
					cy.get( app.input.feel )
						.type('Happy');
					cy.intercept('GET', '/api/playlist')
						.as('playlistRequest');
					cy.contains('button', 'Generate playlist')
						.click();
					
					cy.wait('@playlistRequest')
						.its('request.body')
						.should('deep.equal', {
							date: '2023-05-01',
							genre: 'rock',
							mood: 'Happy'
						});
					
					cy.get('.playlist-container')
						.should('exist');
					cy.get('.track-list')
						.should('exist');
				});
			});
		});
	})

	// context ('API Call', () => {
	// it('Making the API call triggers the loading animation', () => {})
	// it('App advances to Playlist Page with a valid API response', () => {})
	// })

	// context ('Playlist Page', () => {
	// 	// it('App displays the playlist title', () => {})
	// 	// it('App displays tracks appropriate to the date, genre, and mood', () => {})
	// 	// it('App displays a button to generate a new playlist', () => {})
	// 	// it('App advances to Input Page when the "New Playlist" button is clicked', () => {})
	// 	// it('App displays the correct number of tracks', () => {})
	// 	// it('Individual tracks are playable', () => {})
	// })
})