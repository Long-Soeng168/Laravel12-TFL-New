<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateItemColorRequest;
use App\Models\ItemColor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\Middleware;

class ItemColorController extends Controller
{

    public static function middleware(): array
    {
        return [
            new Middleware('permission:item view', only: ['index', 'show']),
            new Middleware('permission:item create', only: ['create', 'store']),
            new Middleware('permission:item update', only: ['edit', 'update']),
            new Middleware('permission:item delete', only: ['destroy', 'destroy', 'remove_item']),
        ];
    }
  
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');

        $query = ItemColor::query();

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('name_kh', 'LIKE', "%{$search}%")
                    ->orWhere('code', 'LIKE', "%{$search}%");
            });
        }
        $query->orderBy($sortBy, $sortDirection);


        $query->with('created_by', 'updated_by');

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        return Inertia::render('admin/item_colors/Index', [
            'tableData' => $tableData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/item_colors/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'code' => 'required|string|max:255|unique:item_colors,code',
        ]);

        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;

        ItemColor::create($validated);

        return redirect()->back()->with('success', 'Item color created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ItemColor $itemColor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ItemColor $itemColor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ItemColor $item_colors)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'code' => 'required|string|max:255|unique:item_colors,code,' . $item_colors->id,
        ]);
    
        $validated['updated_by'] = $request->user()->id;
    
        $item_colors->update($validated); // Fixed here
    
        return redirect()->back()->with('success', 'Item color updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ItemColor $item_color)
    {
        $item_color->delete();

        return redirect()->back()->with('success', 'Item color deleted successfully!');
    }
}
