package com.newsapp;

import android.app.ActivityManager;
import android.app.job.JobParameters;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

import java.util.List;

import javax.annotation.Nullable;

public class NotificationTaskService extends HeadlessJSJobService {

    @Override
    public boolean onStartJob(JobParameters params) {
        Log.d("receiver", "handleTasku");
        if (isAppOnForeground(this)) {
            return false;
        }
        Intent intent = new Intent();
        intent.putExtra("data", "as");
        HeadlessJsTaskConfig taskConfig = getTaskConfig(intent);
        if (taskConfig != null) {
            startTask(taskConfig);
        }
        Log.d("receiver", "handleTaskl");

        return true;
    }


    @Override
    public boolean onStopJob(JobParameters params) {
        Log.d("receiver", "Stop");
        return false;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Toast.makeText(this, " Service Oncreate", Toast.LENGTH_LONG).show();
        Log.d("receiverrr", "onCreate");
    }

    @Override
    protected @Nullable
    HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        Log.d("receiver", "getTaskConfig");
        if(extras != null) {
            Log.d("Service", extras.toString());
            return new HeadlessJsTaskConfig(
                    "NotificationTaskService",
                    Arguments.fromBundle(extras),
                    5000,
                    false
            );
        }
        return null;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d("receiverrr", "onDestroy");
    }

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
        Log.d("receiverrr", "the end");
    }

    private boolean isAppOnForeground(Context context) {
        /**
         We need to check if app is in foreground otherwise the app will crash.
         http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
         **/
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses =
                activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.importance ==
                    ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    appProcess.processName.equals(packageName)) {
                return true;
            }
        }
        return false;
    }

}
