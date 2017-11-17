<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CastlesTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testSinglePeak()
    {
        $response = $this->call('POST', '/castles/calculate', ['landscape' => '4,6,4']);
        $key = "castleCount";
        $response->assertViewHas($key, 1);
    }

    public function testSingleValley()
    {
        $response = $this->call('POST', '/castles/calculate', ['landscape' => '4,1,4']);
        $key = "castleCount";
        $response->assertViewHas($key, 1);
    }

    public function testIncreasingNoPeaks()
    {
        $response = $this->call('POST', '/castles/calculate', ['landscape' => '1,2,3,4,5,6,7,8']);
        $key = "castleCount";
        $response->assertViewHas($key, 0);
    }

    public function testDecreasingNoPeaks()
    {
        $response = $this->call('POST', '/castles/calculate', ['landscape' => '8,7,6,5,4,3,2,1']);
        $key = "castleCount";
        $response->assertViewHas($key, 0);
    }

    public function testAlternatingPeakValley()
    {
        $response = $this->call('POST', '/castles/calculate', ['landscape' => '4,2,4,2,4,2,4,2,4,2,4']);
        $key = "castleCount";
        $response->assertViewHas($key, 9);
    }

    public function testAlternatingValleyValley()
    {
        $response = $this->call('POST', '/castles/calculate', ['landscape' => '2,4,2,4,2,4,2,4,2,4,2']);
        $key = "castleCount";
        $response->assertViewHas($key, 9);
    }

    public function testExtendedPeak()
    {
        $response = $this->call('POST', '/castles/calculate', ['landscape' => '2,4,6,6,6,6,6,4,2']);
        $key = "castleCount";
        $response->assertViewHas($key, 1);
    }

    public function testExtendedValley() {
        $response = $this->call('POST', '/castles/calculate', ['landscape' => '6,4,2,2,2,2,4,6']);
        $key = "castleCount";
        $response->assertViewHas($key, 1);
    }

    public function testAlternativeExtended()
    {
        $response = $this->call('POST', '/castles/calculate', ['landscape' => '6,4,2,2,2,2,4,4,4,4,4,2,2,2,2,4,6']);
        $key = "castleCount";
        $response->assertViewHas($key, 3);
    }

    public function testNegativeInteger() {
        $response = $this->call('POST', '/castles/calculate', ['landscape' => '4,-6,4']);
        $response->assertSessionHas('errors');
    }

    public function testNonInteger() {
        $response = $this->call('POST', '/castles/calculate', ['landscape' => 'asfsd, null ,asdf']);
        $response->assertSessionHas('errors');
    }
}
