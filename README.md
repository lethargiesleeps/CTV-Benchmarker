# CanTrackVote Benchmark Utility

This app runs a variety of profile tests.

## Background Fetch Task
### Things to note:

- Background tasks can only run at a minimum interval of 15 minutes.
- App must be in background or completely closed to for tasks to be executed, this task does not run when app is in foreground and will require different methods.
- Background task is never guaranteed to run at specified interval. Various factors can affect the minimum interval, such as: battery percentage, power-saving mode, battery health, network restrictions (such as limitations on mobile data usage), etc...
- Background task can be profiled for CPU or Memory usage in Android Studio Profiler using process host.exp.exponent. High Memory or CPU usage can result in background task losing priority, and may not run as a result.