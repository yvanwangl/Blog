import { SHOW_RESUME, HIDE_RESUME } from '../constants/ResumeActions';

export function showResume(){
	return {
		type: SHOW_RESUME
	}
}

export function hideResume(){
	return {
		type: HIDE_RESUME
	}
}