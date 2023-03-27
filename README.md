# CanTrackVote Benchmark Utility

This app runs a variety of profile tests.

## Background Fetch Task

### Intensity:
- Low (Fetch 1 MP and 1 Bill per time interval)
- Medium (Fetch 2 MPs and 2 Bills per time interval)
- High (Fetch 4 MPs and 4 Bills per time interval)
- Extreme (Fetch 8 MPs and 8 Bills per time interval)
- 
### Things to note:

- Background tasks can only run at a minimum interval of 15 minutes.
- App must be in background or completely closed to for tasks to be executed, this task does not run when app is in foreground and will require different methods.
- Background task is never guaranteed to run at specified interval. Various factors can affect the minimum interval, such as: battery percentage, power-saving mode, battery health, network restrictions (such as limitations on mobile data usage), etc...
- Background task can be profiled for CPU or Memory usage in Android Studio Profiler using process host.exp.exponent. High Memory or CPU usage can result in background task losing priority, and may not run as a result.