var listingsData = [
	{
		address: '2034 Grand Ave',
		city: 'Seattle',
		state: 'NY',
		bedrooms: 3,
		price: 1450,
		space: 2000,
		homeType: 'Condo',
		image: 'http://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/4206-28/the-kelvin-apartments-exterior.jpg',
		amenities: [
			'gym'
		],
		id: '1'
	},
	{
		address: '221 Grand Ave',
		city: 'Los Angeles',
		state: 'FL',
		bedrooms: 2,
		price: 400,
		space: 2000,
		homeType: 'Apartment',
		image: 'https://media1.popsugar-assets.com/files/thumbor/Af0V62ZM1-yQMQkGblZ4qnXk6Pg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2016/08/03/014/n/1922794/c33b998d4ccdd2e8_FINAL_30_Terrace_revA/i/Gisele-Bundchen-Tom-Brady-Buy-NYC-Apartment.jpg',
		amenities: [
			'elevator',
			'gym',
			'jacuzzi',
			'security'
		],
		id: '2'
	},
	{
		address: '123 Grand Ave',
		city: 'San Francisco',
		state: 'NY',
		bedrooms: 1,
		price: 1000,
		space: 5000,
		homeType: 'House',
		image: 'https://cdn.decoist.com/wp-content/uploads/2015/11/Large-windows-of-the-corner-condo-completely-open-it-up-to-the-view-outside.jpg',
		amenities: [
			'elevator',
			'gym'
		],
		id: '3'
	},
	{
		address: '221 Grand Ave',
		city: 'Miami',
		state: 'FL',
		bedrooms: 2,
		price: 1000,
		space: 2000,
		homeType: 'Apartment',
		image: 'https://ei.marketwatch.com//Multimedia/2016/11/04/Photos/ZH/MW-EZ493_miami__20161104120841_ZH.jpg?uuid=f41fe4c4-a2a8-11e6-ac14-001cc448aede',
		amenities: [
			'elevator',
			'gym',
			'jacuzzi',
			'security'
		],
		id: '4'
	},
	{
		address: '123 Grand Ave',
		city: 'Seattle',
		state: 'NY',
		bedrooms: 1,
		price: 2200,
		space: 10000,
		homeType: 'Apartment',
		image: 'https://cdn.decoist.com/wp-content/uploads/2015/11/Large-windows-of-the-corner-condo-completely-open-it-up-to-the-view-outside.jpg',
		amenities: [
			'elevator',
			'gym'
		],
		id: '5'
	},
	{
		address: '221 Grand Ave',
		city: 'Ridgewood',
		state: 'FL',
		bedrooms: 2,
		price: 5500,
		space: 1000,
		homeType: 'Room',
		image: 'https://media1.popsugar-assets.com/files/thumbor/Gn_Yli13T82NWZbCnLRD51tPTxg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2016/08/03/015/n/1922794/f74dbf9c7f3e7499_FINAL_22_lobby_revA/i/Gisele-Bundchen-Tom-Brady-Buy-NYC-Apartment.jpg',
		amenities: [
			'elevator',
			'gym',
			'jacuzzi',
			'security'
		],
		id: '6'
	},
	{
		address: '221 Grand Ave',
		city: 'Ridgewood',
		state: 'FL',
		bedrooms: 2,
		price: 5500,
		space: 1000,
		homeType: 'Room',
		image: 'https://media1.popsugar-assets.com/files/thumbor/Gn_Yli13T82NWZbCnLRD51tPTxg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2016/08/03/015/n/1922794/f74dbf9c7f3e7499_FINAL_22_lobby_revA/i/Gisele-Bundchen-Tom-Brady-Buy-NYC-Apartment.jpg',
		amenities: [
			'elevator',
			'gym',
			'jacuzzi',
			'security',
			'pool'
		],
		id: '7'
	},
	{
		address: '221 Grand Ave',
		city: 'Ridgewood',
		state: 'FL',
		bedrooms: 2,
		price: 5500,
		space: 1000,
		homeType: 'Room',
		image: 'https://media1.popsugar-assets.com/files/thumbor/Gn_Yli13T82NWZbCnLRD51tPTxg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2016/08/03/015/n/1922794/f74dbf9c7f3e7499_FINAL_22_lobby_revA/i/Gisele-Bundchen-Tom-Brady-Buy-NYC-Apartment.jpg',
		amenities: [
			'elevator',
			'gym',
			'jacuzzi',
			'security',
			'basement'
		],
		id: '8'
	},
	{
		address: '221 Grand Ave',
		city: 'Ridgewood',
		state: 'FL',
		bedrooms: 2,
		price: 5500,
		space: 1000,
		homeType: 'Room',
		image: 'https://media1.popsugar-assets.com/files/thumbor/Gn_Yli13T82NWZbCnLRD51tPTxg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2016/08/03/015/n/1922794/f74dbf9c7f3e7499_FINAL_22_lobby_revA/i/Gisele-Bundchen-Tom-Brady-Buy-NYC-Apartment.jpg',
		amenities: [
			'elevator',
			'gym',
			'jacuzzi',
			'security',
			'pool'
		],
		id: '9'
	},
	{
		address: '221 Grand Ave',
		city: 'Ridgewood',
		state: 'FL',
		bedrooms: 2,
		price: 5500,
		space: 1000,
		homeType: 'Room',
		image: 'https://media1.popsugar-assets.com/files/thumbor/Gn_Yli13T82NWZbCnLRD51tPTxg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2016/08/03/015/n/1922794/f74dbf9c7f3e7499_FINAL_22_lobby_revA/i/Gisele-Bundchen-Tom-Brady-Buy-NYC-Apartment.jpg',
		amenities: [
			'elevator',
			'gym',
			'jacuzzi',
			'security',
			'basement'
		],
		id: '10'
	},
	{
		address: '221 Grand Ave',
		city: 'Ridgewood',
		state: 'FL',
		bedrooms: 2,
		price: 5500,
		space: 1000,
		homeType: 'Room',
		image: 'https://media1.popsugar-assets.com/files/thumbor/Gn_Yli13T82NWZbCnLRD51tPTxg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2016/08/03/015/n/1922794/f74dbf9c7f3e7499_FINAL_22_lobby_revA/i/Gisele-Bundchen-Tom-Brady-Buy-NYC-Apartment.jpg',
		amenities: [
			'elevator',
			'gym',
			'jacuzzi',
			'security',
			'basement'
		]
	}
];

export default listingsData;