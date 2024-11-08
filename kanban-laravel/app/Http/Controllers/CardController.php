<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function index()
    {
        $cards = Card::all();
        return response()->json($cards);
    }

    public function store(Request $request)
    {
        // Assuming no validation for now, as per your request
        $card = Card::create([
            'title' => $request->title,
            'column' => $request->column
        ]);

        return response()->json($card, 201);
    }
}
