'use strict';

module.exports = {
	DEBUG : true,
	// Ui Const
	ui : {		
		UNIT : 32,
		HEIGHT_CHARS : 36,
		SIZE_PX : {w : 1792, h : 1472},
		SIZE_UNIT : {w : 56, h : 46}
	},
	// Motion Const
	motion : {		
		GRAVITY : 9.80665,
		LIMIT_ORIENTATION : 20,
		STEP_ACCELERATION : 1,
		STEP_RATE : 300
	},
	// Audio Conf
	audio : {		
		THRESHOLD : -80,
		DELAY_STABLE : 2000
	},
	// Screen Const
	screens : {
		HOME : 'home'
	},
	// Direction Const
	directions : {		
		UP : 1,
		LEFT : 2,
		RIGHT : 3,
		DOWN : 4
	}
};
