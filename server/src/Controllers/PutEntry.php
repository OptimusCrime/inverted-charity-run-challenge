<?php
namespace OptimusCrime\Controllers;

use Carbon\Carbon;

use OptimusCrime\Models\Entry;

class PutEntry
{
     public static function put($identifier, $comment)
    {
        $entry = new Entry();
        $entry->identifier = $identifier;
        $entry->comment = $comment;
        $entry->added = Carbon::now();

        return $entry->save();
    }
}
