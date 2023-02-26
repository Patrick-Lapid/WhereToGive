import { Button } from '@mantine/core';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from "../../css/card.module.css";

interface userProps {
    image : string;
    name : string;
    role : string;
    info : string;
    url : string;
}

function DeveloperCard(props : userProps) {
    const [flipped, setFlipped] = useState(false);
    const card = document.querySelector(".card_inner");

    let classname1 = `${styles.card__face} ${styles.card__face__front}`;
    let classname2 = `${styles.card__face} ${styles.card__face__back}`;

    return (
    <div className={styles.card} onClick={(event) => {
            setFlipped(!flipped);
        }}>
		<div className={
            [(flipped) && styles.is_flipped, styles.card__inner]
            .filter(e => !!e)
            .join(' ')
        }>
			<div className={classname1}>
				<h2>{props.name}</h2>
                <p></p>
			</div>
			<div className={classname2}>
				<div className={styles.card__content}>
					<div className={styles.card__header}>
						<img src={props.image} alt="" className={styles.pp} />
						<h2>{props.name}</h2>
					</div>
					<div className={styles.card__body}>
						<h3>{props.role}</h3>
						<p>{props.info}</p>
					</div>
                    <Link to={{ pathname: props.url }} style={{color: "inherit", textDecoration: "inherit"}} target="_blank">
                        <Button
                            onClick={(event) =>  {
                                event.stopPropagation();
                            }}
                            variant="gradient" 
                            gradient={{ from: 'teal', to: 'violet', deg: 20 }}
                            fullWidth
                        >
                            See more work from this developer
                        </Button>
                    </Link>
				</div>
			</div>
		</div>
	</div>
    )
}

export default DeveloperCard;