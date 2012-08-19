#region License

/* 
 * All content copyright Terracotta, Inc., unless otherwise indicated. All rights reserved. 
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not 
 * use this file except in compliance with the License. You may obtain a copy 
 * of the License at 
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0 
 *   
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT 
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the 
 * License for the specific language governing permissions and limitations 
 * under the License.
 * 
 */

#endregion

using System;
using System.Threading;
using Quartz.Impl;
using Quartz.Impl.Matchers;
using Quartz;
using log4net;

namespace Chinook.QuartzScheduler
{
    /// <summary> 
    /// Demonstrates the behavior of <see cref="IJobListener" />s.  In particular, 
    /// this example will use a job listener to trigger another job after one
    /// job succesfully executes.
    /// </summary>
    /// <author>Marko Lahma (.NET)</author>
    public class AdpIorsComparerScheduler : IExample
    {
        private static IScheduler sched;
        private static ILog log;
        public string Name
        {
            get { return GetType().Name; }
        }

        public virtual void Run()
        {
            log = LogManager.GetLogger(typeof(AdpIorsComparerScheduler));

            log.Info("------- Initializing ----------------------");

            // First we must get a reference to a scheduler
            ISchedulerFactory sf = new StdSchedulerFactory();
            sched = sf.GetScheduler();

            log.Info("------- Initialization Complete -----------");

            log.Info("------- Scheduling Jobs -------------------");

            // job "AdpIorsComparerJob" will run every one minutes but only between 3pm and 11pm

            IJobDetail job = JobBuilder.Create<AdpIorsComparerJob>()
                .WithIdentity("AdpIorsComparerJob")
                .Build();

            ITrigger trigger = (ICronTrigger)TriggerBuilder.Create()
                                         .WithIdentity("AdpIorsComparerJobTrigger", "AdpIors")
                                         .WithCronSchedule("0 0/1 15-23 * * ?") //run every one minutes but only between 3pm and 11pm
                                         .Build();            
            // Set up the listener
            IJobListener listener = new AdpIorsComparerJobListener();
            IMatcher<JobKey> matcher = KeyMatcher<JobKey>.KeyEquals(job.Key);
            sched.ListenerManager.AddJobListener(listener, matcher);

            // schedule the job to run
            sched.ScheduleJob(job, trigger);

            // All of the jobs have been added to the scheduler, but none of the jobs
            // will run until the scheduler has been started
            log.Info("------- Starting Scheduler ----------------");
            sched.Start();
        }
        public virtual void Stop()
        {
            log.Info("------- Stopping ----------------------");
            sched.Shutdown(true); //This will wait for all jobs to finish and ensure everything is cleaned up correctly.
            log.Info("------- Stopped ----------------------");
        }
    }
}