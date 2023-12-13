<?php

namespace KimaiPlugin\PslBundle\EventSubscriber;

use App\Event\TimesheetDeletePreEvent;
use App\Event\TimesheetCreatePostEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use App\Activity\ActivityService;

class TimesheetPslSubscriber implements EventSubscriberInterface
{

    public function __construct(private ActivityService $activityService)
    {
        $this->leaveRatio = 1 / 30;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            TimesheetCreatePostEvent::class => ['updatePslBalanceCreate', 200],
            TimesheetDeletePreEvent::class => ['handlePslBalanceDelete', 200]
        ];
    }


    public function handlePslBalanceDelete(TimesheetDeletePreEvent $event): void
    {


        $recordDuration = $event->getTimesheet()->getDuration();
        $accruedSickLeave = $recordDuration * ($this->leaveRatio);

        $project = $event->getTimesheet()->getProject();
        $pslActivity = $this->activityService->findActivityByName("PSL",  $project);
        $currentTimeBudget = $pslActivity->getTimeBudget();
        $pslActivity->setTimeBudget($currentTimeBudget - $accruedSickLeave);
        $this->activityService->updateActivity($pslActivity);
    }

    public function updatePslBalanceCreate(TimesheetCreatePostEvent $event): void
    {
        $recordDuration = $event->getTimesheet()->getDuration();
        $accruedSickLeave = $recordDuration * ($this->leaveRatio);

        $project = $event->getTimesheet()->getProject();
        $pslActivity = $this->activityService->findActivityByName("PSL",  $project);
        $currentTimeBudget = $pslActivity->getTimeBudget();
        $pslActivity->setTimeBudget($currentTimeBudget + $accruedSickLeave);
        $this->activityService->updateActivity($pslActivity);
    }
}
