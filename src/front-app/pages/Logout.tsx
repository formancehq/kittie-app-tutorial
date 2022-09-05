import * as React from 'react';
import { signOut } from '../lib/api';

export const Logout = () => {
	signOut();
}