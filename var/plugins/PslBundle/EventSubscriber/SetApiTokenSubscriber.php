<?php

namespace KimaiPlugin\PslBundle\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use App\User\UserService;
use Psr\Log\LoggerInterface;
use App\Event\UserCreatePostEvent;


/**
 * This is listener will set an API token for any created user and is only intended to be used
 * as part of this demo.
 * 
 */
class SetApiTokenSubscriber implements EventSubscriberInterface
{

    public function __construct(private LoggerInterface $myLogger, private UserService $userService)
    {
        $this->logger = $myLogger;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            UserCreatePostEvent::class => ['onUserCreate', 200],
        ];
    }

    public function onUserCreate(UserCreatePostEvent $event)
    {
        $this->logger->critical("Updating user!");
        $user = $event->getUser();
        $user->setPlainApiToken("password");
        $this->userService->updateUser($user);
    }
}
