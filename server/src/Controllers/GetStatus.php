<?php
namespace OptimusCrime\Controllers;

use OptimusCrime\Models\Entry;

class GetStatus
{
    public static function get(array $challenges)
    {
        $output = [];
        foreach ($challenges as $challenge) {
            $output[] = static::challengeStatus($challenge);
        }

        return $output;
    }

    private static function challengeStatus(array $challenge)
    {
        $entries = Entry
            ::where('identifier', $challenge['identifier'])
            ->get();

        $currentDistance = static::calculateCurrentDistance($entries);
        $currentDonations = static::calculateCurrentDonationsRemoved(
            $challenge['sum'],
            $challenge['target'],
            $currentDistance
        );

        $daysSinceStart = static::daysBetween($challenge['date_start']) + 1;

        return [
            'identifier' => $challenge['identifier'],
            'date_start' => $challenge['date_start'],
            'date_end' => $challenge['date_end'],
            'distance_target' => $challenge['target'],
            'distance_current' => $currentDistance,
            'distance_remaining' => $challenge['target'] - $currentDistance,
            'donations_start' => $challenge['sum'],
            'donations_removed' => $currentDonations,
            'donations_remaining' => $challenge['sum'] - $currentDonations,
            'active' => $challenge['active'],
            'current' => $challenge['current'],
            'days_since_start' => $challenge['active'] ? $daysSinceStart : null,
            'days_remaining' => $challenge['active'] ? static::daysBetween($challenge['date_end'], null) : null,
        ];
    }

    private static function daysBetween($dateStart, $dateEnd = null)
    {
        $startDateTime = new \DateTime($dateStart);
        $currentDateTime = new \DateTime($dateEnd);

        return (int) $currentDateTime->diff($startDateTime)->format('%a');

    }

    private static function calculateCurrentDonationsRemoved($donations, $targetDistance, $currentDistance)
    {
        $donationsPerKilometer = $donations / $targetDistance;
        return $donationsPerKilometer * $currentDistance;
    }

    private static function calculateCurrentDistance($entries) {
        $distance = 0;
        foreach ($entries as $entry) {
            $distance += (int) $entry->distance;
        }

        return $distance / 1000;
    }
}
