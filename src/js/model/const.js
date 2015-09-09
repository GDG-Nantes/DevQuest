'use strict';
var Characters = require('./charaters-cst.js');

module.exports = {
	DEBUG : false,
	// Ui Const
	ui : {		
		UNIT : 32,
		HEIGHT_CHARS : 36,
		WIDTH_NPC : 24,
		SIZE_PX : {w : 1792, h : 1472},
		SIZE_UNIT : {w : 56, h : 46},
		NPC_HEAD_W : 60,
		NPC_HEAD_H : 71,
		NPC_HEAD_X : 82,
		NPC_HEAD_Y : 3, 
		RATIO_SKY : 0.725,
		RATIO_WATER : 0.125,
		RATIO_GRASS : 0.1875,
		RATIO_CLOUD : 0.175,
		RATIO_TITLE : 0.08125,
		RATIO_LOGO : 0.2375,
		MAX_WIDTH_PARALLAX : 1000,
		WIDTH_CLOUD_PARALLAX : 800,
		SPEED_CLOUD : 0.15,
		SPEED_GRASS : 0.75
	},
	// Motion Const
	motion : {		
		GRAVITY : 9.80665,
		LIMIT_ORIENTATION : 20,
		LIMIT_ORIENTATION_ALERT : 50,
		STEP_ACCELERATION : 1,
		STEP_RATE : 300
	},
	// Audio Conf
	audio : {		
		THRESHOLD : -80,
		DELTA : 40,
		DELAY_STABLE : 2000
	},
	// Screen Const
	screens : {
		HOME : 'home',
		LOGIN : 'login',
		CHOOSE_USER : 'choose-user',
		GAME : 'game',
		INSIDE_SILVER : 'inside-silver',
		INSIDE_GOLD : 'inside-gold',
		INSIDE_PLATINIUM : 'inside-platinium'
	},
	// Direction Const
	directions : {		
		UP : 1,
		LEFT : 2,
		RIGHT : 3,
		DOWN : 4
	},
	// Events types
	eventType : {
		UP : 1,
		DOWN : 2,
		SOUND : 3
	},
	// Communes
	common : {
		STAND_SILVER : 1
		, STAND_GOLD : 2
		, STAND_PLATINIUM : 3
	},
	// Personnages
	characters : Characters,
	// Ui elements clickable
	uiElements : {
		BTN_LEFT : 'btn-left',
		BTN_RIGHT : 'btn-right',
		BTN_CHOISIR : 'btn-choose',
		BTN_DEMARER : 'btn-demarer',
		DOOR : 'door',
		BTN_REP_A : 'reponse-a',
		BTN_REP_B : 'reponse-b',
		BTN_REP_C : 'reponse-c',
		BTN_REP_D : 'reponse-d',
		BTN_G_PLUS : 'google-plus',
		BTN_TWITTER : 'twitter',
		BTN_GITHUB : 'github',
		BTN_CUSTO : 'custo', 
		BTN_PARAM : 'param',
		BTN_PARAM_CLOSE : 'param-close',
		BTN_PARAM_MIC : 'param-mic',
		BTN_PARAM_MOTION : 'param-motion',
		BTN_DIRECTION_UP : 'btn-direction-up',
		BTN_DIRECTION_LEFT : 'btn-direction-left',
		BTN_DIRECTION_RIGHT : 'btn-direction-right',
		BTN_DIRECTION_DOWN : 'btn-direction-down',
		BTN_YES : 'btn-yes',
		BTN_OK : 'btn-ok',
		BTN_NO : 'btn-no'
	}
};
