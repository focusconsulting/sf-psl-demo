<?php

namespace PslBundle\Migrations;

use App\Doctrine\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;



final class Version20200730115147 extends AbstractMigration
{

    public function getDescription(): string
    {
        return 'Create demo data';
    }

    public function up(Schema $schema): void
    {
        $customers = "
    INSERT INTO kimai.kimai2_customers (name,`number`,comment,visible,company,contact,address,country,currency,phone,fax,mobile,email,homepage,timezone,color,time_budget,budget,vat_id,budget_type,billable,invoice_template_id,invoice_text) VALUES
        ('Allison Saris','0001',NULL,1,NULL,NULL,NULL,'US','USD',NULL,NULL,NULL,NULL,NULL,'UTC',NULL,0,0.0,NULL,NULL,1,NULL,NULL);
    ";
        $projects = "
    INSERT INTO kimai.kimai2_projects (customer_id,name,order_number,comment,visible,budget,color,time_budget,order_date,`start`,`end`,timezone,budget_type,billable,invoice_text,global_activities) VALUES
        (LAST_INSERT_ID(),'Allison Saris SF PSL',NULL,NULL,1,0.0,NULL,0,NULL,NULL,NULL,'UTC',NULL,1,NULL,1);
    ";
        $activities = "
    INSERT INTO kimai.kimai2_activities (project_id,name,comment,visible,color,time_budget,budget,budget_type,billable,invoice_text) VALUES
        (LAST_INSERT_ID(),'Cleaning',NULL,1,NULL,0,0.0,NULL,1,NULL),
        (LAST_INSERT_ID(),'PSL',NULL,1,NULL,4800,0.0,NULL,1,NULL);
    ";
        $timesheets = "
        INSERT INTO kimai.kimai2_timesheet (`user`,activity_id,project_id,start_time,end_time,duration,description,rate,fixed_rate,hourly_rate,exported,timezone,internal_rate,billable,category,modified_at,date_tz) VALUES
	 ((select id from kimai.kimai2_users),(select id from kimai.kimai2_activities where name = 'Cleaning'),(select id from kimai.kimai2_projects where name='Allison Saris SF PSL'),(select TIMESTAMP(CONCAT(DATE_SUB(CURDATE(), INTERVAL 1 DAY), ' ', MAKETIME(8, 0, 0)))),(select TIMESTAMP(CONCAT(DATE_SUB(CURDATE(), INTERVAL 1 DAY), ' ', MAKETIME(16, 0, 0)))),28800,NULL,0.0,NULL,0.0,0,'UTC',0.0,1,'work','2023-12-03 01:03:17','2023-12-03'),
	 ((select id from kimai.kimai2_users),(select id from kimai.kimai2_activities where name = 'Cleaning'),(select id from kimai.kimai2_projects where name='Allison Saris SF PSL'),(select TIMESTAMP(CONCAT(DATE_SUB(CURDATE(), INTERVAL 2 DAY), ' ', MAKETIME(8, 0, 0)))),(select TIMESTAMP(CONCAT(DATE_SUB(CURDATE(), INTERVAL 2 DAY), ' ', MAKETIME(16, 0, 0)))),28800,NULL,0.0,NULL,0.0,0,'UTC',0.0,1,'work','2023-12-03 01:03:17','2023-12-02'),
	 ((select id from kimai.kimai2_users),(select id from kimai.kimai2_activities where name = 'Cleaning'),(select id from kimai.kimai2_projects where name='Allison Saris SF PSL'),(select TIMESTAMP(CONCAT(DATE_SUB(CURDATE(), INTERVAL 3 DAY), ' ', MAKETIME(8, 0, 0)))),(select TIMESTAMP(CONCAT(DATE_SUB(CURDATE(), INTERVAL 3 DAY), ' ', MAKETIME(16, 0, 0)))),28800,NULL,0.0,NULL,0.0,0,'UTC',0.0,1,'work','2023-12-03 01:03:17','2023-12-01'),
	 ((select id from kimai.kimai2_users),(select id from kimai.kimai2_activities where name = 'Cleaning'),(select id from kimai.kimai2_projects where name='Allison Saris SF PSL'),(select TIMESTAMP(CONCAT(DATE_SUB(CURDATE(), INTERVAL 4 DAY), ' ', MAKETIME(8, 0, 0)))),(select TIMESTAMP(CONCAT(DATE_SUB(CURDATE(), INTERVAL 4 DAY), ' ', MAKETIME(16, 0, 0)))),28800,NULL,0.0,NULL,0.0,0,'UTC',0.0,1,'work','2023-12-03 01:03:17','2023-12-02'),
	 ((select id from kimai.kimai2_users),(select id from kimai.kimai2_activities where name = 'Cleaning'),(select id from kimai.kimai2_projects where name='Allison Saris SF PSL'),(select TIMESTAMP(CONCAT(DATE_SUB(CURDATE(), INTERVAL 5 DAY), ' ', MAKETIME(8, 0, 0)))),(select TIMESTAMP(CONCAT(DATE_SUB(CURDATE(), INTERVAL 5 DAY), ' ', MAKETIME(16, 0, 0)))),28800,NULL,0.0,NULL,0.0,0,'UTC',0.0,1,'work','2023-12-03 01:05:37','2023-12-03');

        ";

        $this->addSql($customers);
        $this->addSql($projects);
        $this->addSql($activities);
        $this->addSql($timesheets);
    }

    public function down(Schema $schema): void
    {
        $this->preventEmptyMigrationWarning();
    }
}
