select cron.schedule (
    'recurring_donations_transactions', -- name of the cron job
    '0 6 * * *', -- Every day at 6:00 am
    $$  
        BEGIN;

        CREATE TEMPORARY TABLE active_donations AS (
        SELECT DISTINCT ON (recurring_donations.id) 
        recurring_donations.*
        FROM recurring_donations
        JOIN (
            SELECT DISTINCT name
            FROM pg_timezone_names
        ) AS time_zones ON TRUE
        WHERE DATE_PART('month', timezone(time_zones.name, CURRENT_TIMESTAMP)) = DATE_PART('month', date)
        AND DATE_PART('day', timezone(time_zones.name, CURRENT_TIMESTAMP)) = DATE_PART('day', date)
        AND DATE_PART('year', timezone(time_zones.name, CURRENT_TIMESTAMP)) = DATE_PART('year', date)
        );

        SELECT * FROM active_donations;

        INSERT INTO donations (userid, charityid, amount, trans_date)
        SELECT userid, charityid, amount, date as trans_date 
        FROM active_donations
        WHERE active_donations.active = true;

        UPDATE recurring_donations as rd
        SET date = rd.date + INTERVAL '1 month'
        FROM active_donations as ad
        WHERE rd.id = ad.id;

        COMMIT;
        $$
);