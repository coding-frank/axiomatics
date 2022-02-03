interface IAgencyState {
	uuid: string;
	agency_rel_id: string; // new
	name: string;
	contact: {
		email: {
			domain: string | null;
			excursions: string | null;
			general: string;
			operations: string | null;
		};
		phone: {
			emergency: string | null;
			general: string;
		};
	};
	is_contract?: boolean;
	created: number;
	location: {
		destination: string;
		destination_id: number;
	};
	sellers: {
		count: number;
	};
}

interface IDestinationState {
	country_id: number;
	created: Date | null;
	destination: string;
	group_code: string;
	id: number;
	is_active: boolean;
	lang_id: number;
	lat: number | null;
	lng: number | null;
	province_id: number;
	via_id: number | null;
}

interface IHotelState {
	author: string;
	author_id: string;
	created: number;
	has_report: boolean;
	hotel_id: string;
	name: string;
	poi: boolean;
	location: {
		destination_id: number;
		destination: string;
		lat: number;
		lng: number;
		place_id: string;
		province: string;
		zone_id: number;
		zone_name: string;
	};
}

interface ILanguageState {
	hasLocale: boolean;
	id: number;
	language: string;
	prefix: string;
	short: string;
}

interface IModuleState {
	module_id: number;
	expiry_date?: string;
	is_cancelled?: boolean;
	allow_babies?: boolean;
	allow_infants?: boolean;
	allow_mix?: boolean;
	chaffeur?: boolean;
	codriver_mode?: boolean;
	infants_seatless?: boolean;
	isTicket?: boolean;
	isVehicle?: boolean;
	is_active?: boolean;
	max_seat?: number;
	max_veh?: number;
	min_seat?: number;
	min_veh?: number;
	is_current?: boolean;
	start_date?: string;
	end_date?: string;
	img_name: string;
	module: string;
	module_id: number;
	veh1: string;
	veh2: null;
}

interface IPickupState {
	author?: string;
	author_id?: string;
	company_id?: string;
	created?: number;
	description?: string;
	id?: number;
	integrate?: true;
	location?: {
		destination_id: number;
		destination?: string;
	};
	relations?: {
		company_id: string;
	};
	route?: {
		delay_mins: number;
		first_stop: string;
		hotels_remaining: TPickupValuesHotels[] | null;
		stops: {
			key?: number;
			delay: number;
			hotel_id: string;
			name: string;
			//hotelname: string;
			neighbouring_hotel_id: string | null;
			time: string;
			zone_id: number;
			zone_name: string;
		}[];
		zone_ids: number[];
		zones: { zone_id: number; zone: string }[];
	}; // []
	set_name: string;
	status: {
		is_active: boolean;
		is_current: boolean;
	};
	valid_from: number;
	valid_till: number;
	warnings: {
		message: string;
	}[]; // ?
}

interface ISettingsState {
	hiddenFooter?: boolean;
	showClosed?: boolean;
	showPast?: boolean;
	showBooked?: boolean;
	bookmarksOnly?: boolean;
	hideCancel?: boolean;
	moduleId?: string | null;
	bookingShowCancelled?: boolean;
	bookingShowMarkedOnly?: boolean;
	bookingShowUnreadOnly?: boolean;
	bookingsView?: string;
	bookingLimit?: number;
	bookingEventId?: string | string[] | null;
	bookingAgencyId?: string;
	bookingSellerId?: string;
	bookingDestId?: number;
	bookingDateRange?: string[];
	bookingDateCol?: string;
}

interface ITourState {
	ages: {
		age_min_chd: number | null;
		age_min_driver: number | null;
		age_min_senior: number | null;
		allow_infants: boolean;
		allow_babies: boolean;
		allow_seniors: boolean;
	};
	application: {
		color: string;
	};
	author_id: string;
	calendar: {
		day1: boolean;
		day2: boolean;
		day3: boolean;
		day4: boolean;
		day5: boolean;
		day6: boolean;
		day7: boolean;
		deadline_day: string;
		deadline_time: string;
		duration: number;
		// HH:mm:ss
		start_time: string;
		valid_from: number;
		valid_till: number;
	};
	cancelation: {
		fee: number;
		percent: number;
		free_hours: number;
	};
	contact: string[];
	created: number;
	currency: {
		id: number;
		sign: string;
		decimals: number;
		code?: string; // ?
	};
	location: {
		destination: string;
		destination_id: number;
		province: string;
		region_code: string;
		zone: string;
		zone_id: number;
	};
	module: string;
	name: string;
	prices: {
		adt: number | null;
		chd: number | null;
		inf: number | null;
		sen: number | null;
		baby: number | null;
	};
	relations: {
		agencies: TTourAgenciesRelation[];
		company_id: string;
		module_id: number;
		pickups: string[]; // todo
		stops: TTourValuesStops[]; // todo
	};
	status: {
		is_active: boolean;
	};
	uuid: string;
	vehicle: TEventVehicle;
}

type TUserStateDestinations = {
	id: number;
	destination: string;
	is_active: boolean;
	country_id: number;
	country: string;
	group_code: string;
	via_id: number;
	province_id: number;
	created: number;
	lang_id: number;
	lat: number;
	lng: number;
	headquarter?: boolean;
	currency: {
		currency_id: number;
		code: string;
		sign: string;
		decimals: number;
	};
	province: {
		province: string;
		id: number;
	};
};

interface IUserState {
	id: string;
	user_name: string;
	avatar: string;
	role: TRole;
	agency_id: string | null;
	company_id: string | null;
	lang_short: TLocalesTwoLetters;
	// user verification only
	is_active?: boolean;
	is_blocked?: boolean;
	is_activated?: boolean;
	//
	is_owner?: boolean;
	lang_id?: number;
	email_updated?: boolean;
	// end: user verification only
	email: string;
	email_is_verified?: boolean;
	mobile_is_verified: boolean;
	currency: {
		id: number;
		sign: string;
		code: string;
		decimals: number;
	};
	location: {
		lat: number;
		lng: number;
		country_lat: number;
		country_lng: number;
		province: string;
		province_id: number;
		country_id: number;
		country_code: string;
		group_code: string;
	};
	destinations: TUserStateDestinations[] | null;
	destination_id: number;
	destination_ids: number[];
	hide_tour_popup: boolean;
	hide_company_popup?: boolean;
	company?: {
		company_id: string;
		company_name: string;
		company_status: boolean;
		is_trail: boolean;
		is_blocked: boolean;
		next_payment: number;
		payment_notify: boolean;
		created: number;
		email_general: string;
	};
	agency?: {
		agency_id: string;
		agency: string;
	};
	platform?: string;
	memory?: string | null;
	tours?: string[];
	hotels?: string[];
	password_digest?: string;
}

interface IVehicleState {
	author: string;
	author_id: string;
	company_id: string;
	count_seats: number;
	created: Date;
	destination_id: number;
	is_active: true;
	name: string;
	source_destinations: {
		destination: string;
	};
	uuid: string;
}

interface ISellerState {
	agency_id: string;
	company_id: string | null;
	destination_id: number;
	img_name: string;
	img_updated: boolean;
	is_activated: boolean;
	lang_id: number;
	mobile: string | null;
	mobile_is_verified: boolean;
	name: string;
	role: TRole;
	source_destinations: {
		destination: string;
	};
	email: string;
	email_pending: string | null;
	is_active: boolean;
	uuid: string;
}

interface IZonesState {
	destination?: string;
	destination_id?: number;
	province?: string;
	id: number;
	zone_name: string;
}
