<?php

namespace App\Http\Controllers;

use App\Models\Email;
use App\Models\PhoneNumber;
use App\Models\Location;
use App\Models\Contact;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Location::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'address'=> ['required', 'string'],
            'contact_id' => ['required', 'exists:contacts,id'],
        ]);

        $location = Location::create($validated);
        return response()->json($location, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        return $location->load(['contact']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location)
    {
        $validated = $request->validate([
            'address'=> ['sometimes', 'required', 'string'],
            'contact_id' => ['sometimes', 'required', 'exists:contacts,id'],
        ]);

        $location->update($validated);
        return response()->json($location, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        $location->delete();
        return response()->json(null);
    }
}
