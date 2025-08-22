<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /** @use HasFactory<\Database\Factories\ItemFactory> */
    use HasFactory;

    protected $guarded = [];
    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id', 'id');
    }
    public function category()
    {
        return $this->belongsTo(ItemCategory::class, 'category_code', 'code');
    }
    public function brand()
    {
        return $this->belongsTo(ItemBrand::class, 'brand_code', 'code');
    }
    public function model()
    {
        return $this->belongsTo(ItemModel::class, 'model_code', 'code');
    }
    public function brand_model()
    {
        return $this->belongsTo(ItemModel::class, 'model_code', 'code');
    }
    public function body_type()
    {
        return $this->belongsTo(ItemBodyType::class, 'body_type_code', 'code');
    }
    public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_by()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
    public function images()
    {
        return $this->hasMany(ItemImage::class, 'item_id', 'id');
    }
}
