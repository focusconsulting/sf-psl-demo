<?php

namespace KimaiPlugin\PslBundle\EventSubscriber;

use App\Event\TimesheetUpdatePostEvent;
use App\Event\TimesheetCreatePostEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use App\Activity\ActivityService;
use Psr\Log\LoggerInterface;

class TimesheetPslSubscriber implements EventSubscriberInterface
{

    public function __construct(private LoggerInterface $myLogger, private ActivityService $activityService)
    {
        $this->logger = $myLogger;
        $this->leaveRatio = 1 / 30;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            TimesheetUpdatePostEvent::class => ['updatePslBalanceUpdate', 200],
            TimesheetCreatePostEvent::class => ['updatePslBalanceCreate', 200],
            TimesheetDeletePreEvent::class => ['handlePslBalanceDelete', 200]
        ];
    }


    public function handlePslBalanceDelete(TimesheetDeletePreEvent $event): void
    {
        $this->logger->critical($event->getTimesheet()->getProject()->getId());

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
        $this->logger->critical($event->getTimesheet()->getProject()->getId());

        $recordDuration = $event->getTimesheet()->getDuration();
        $accruedSickLeave = $recordDuration * ($this->leaveRatio);

        $project = $event->getTimesheet()->getProject();
        $pslActivity = $this->activityService->findActivityByName("PSL",  $project);
        $currentTimeBudget = $pslActivity->getTimeBudget();
        $pslActivity->setTimeBudget($currentTimeBudget + $accruedSickLeave);
        $this->activityService->updateActivity($pslActivity);
    }
}
