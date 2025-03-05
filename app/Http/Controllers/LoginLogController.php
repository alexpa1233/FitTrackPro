<?php

namespace App\Http\Controllers;

use App\Models\LoginLog;
use Illuminate\Http\Request;

class LoginLogController extends Controller
{
    
    public function getMonthlyLoginActivity(){
        $months = collect();
        $currentDate = now();

        for ($i = 0; $i < 12; $i++) {
            $months->push([
                'month' => $currentDate->copy()->subMonths($i)->format('Y-m'),
                'total_users' => 0
            ]);
        }

        $loginStats = LoginLog::whereBetween('created_at', [
            (new \DateTime())->modify('-12 months')->format('Y-m-01'),
            (new \DateTime())->format('Y-m-t')
        ])->selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(DISTINCT user_id) as total_users')
        ->groupBy('year', 'month')
        ->orderBy('year', 'asc')
        ->orderBy('month', 'asc')
        ->get();

        foreach ($months as &$month) {
            $matchingStat = $loginStats->firstWhere('month', substr($month['month'], 5));
            if ($matchingStat) {
                $month['total_users'] = $matchingStat->total_users;
            }
        }

        return response(
            [
                'status' => 'success',
                'data' => $months,
                'code' => 200
            ]
        );
    }
}
