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
using log4net;
using Quartz;



namespace Chinook.QuartzScheduler
{
    /// <author>wkratzer</author>
    /// <author>Marko Lahma (.NET)</author>
    public class AdpIorsComparerJobListener : IJobListener
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(AdpIorsComparerJobListener));

        public virtual string Name
        {
            get { return GetType().Name; }
        }

        public virtual void JobToBeExecuted(IJobExecutionContext inContext)
        {
            log.Info("AdpIorsComparerJobListener says: Job Is about to be executed.");
        }

        public virtual void JobExecutionVetoed(IJobExecutionContext inContext)
        {
            log.Info("AdpIorsComparerJobListener says: Job Execution was vetoed.");
        }

        public virtual void JobWasExecuted(IJobExecutionContext inContext, JobExecutionException inException)
        {
            log.Info("AdpIorsComparerJobListener says: Job was executed.");
        }
    }
}