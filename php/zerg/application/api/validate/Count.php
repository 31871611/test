<?php
namespace app\api\validate;

use think\Validate;

class Count extends BaseValidate{

    protected $rule = [
        'count' => 'isPositiveInteger|between:1,15',
    ];


}