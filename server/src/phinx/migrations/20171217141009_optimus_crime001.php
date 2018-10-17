<?php
use Phinx\Migration\AbstractMigration;

class OptimusCrime001 extends AbstractMigration
{
    public function change()
    {
        $this->table('entry')
            ->addColumn('identifier', 'string', ['default' => 'first', 'null' => false, 'limit' => 80])
            ->addColumn('added', 'datetime', ['default' => null, 'null' => false])
            ->addColumn('distance', 'integer', ['default' => 0, 'null' => false])
            ->addColumn('duration', 'integer', ['default' => 0, 'null' => false])
            ->addColumn('comment', 'text', ['null' => true, 'default' => null])
            ->create();
    }
}
