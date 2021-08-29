import React from 'react';
import styles from './loader.module.css';

export default function Loader() {
	return (
		<div className={styles.loader__outer}>
			<div className={styles.loader}>
				<div className={styles.loader__inner}></div>
			</div>
		</div>
	);
}
