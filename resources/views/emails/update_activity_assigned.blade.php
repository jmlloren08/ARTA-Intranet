<!DOCTYPE html>
<html>

<head>
    <title>Activity Updated</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Anti-Red_Tape_Authority_Logo.png" alt="ARTA Logo" style="width: 100px; height: auto;">
        </div>

        <h2 style="font-size: 20px; font-weight: bold; color: #111827;">Activity Updated</h2>

        <p style="font-size: 16px; color: #1f2937;">Hi {{ $user->name }},</p>

        <p style="font-size: 16px; color: #1f2937;">The following activity has been updated by {{ $user->name === $updatedBy->name ? '(YOU)' : $updatedBy->name }}:</p>

        <ul style="list-style-type: none; padding: 0;">
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Work Item:</strong> {{ $activitiesData->work_item }}
            </li>
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Description:</strong> {{ $activitiesData->description }}
            </li>
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Status:</strong> {{ $activitiesData->progress }}
            </li>
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Action taken and notes:</strong> {{ $activitiesData->remarks }}
            </li>
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Action Taken by:</strong> {{ $user->name === $updatedBy->name ? '(YOU)' : $updatedBy->name }}
            </li>
        </ul>
        <!-- Action Button -->
        <div style="text-align: center; margin-top: 20px;">
            <a href="https://arta-intranet.appjsvn.com/" style="background-color: #3b82f6; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 16px;">
                Login to View Activity
            </a>
        </div>

        <p style="font-size: 16px; color: #1f2937;">Regards,<br>Operations Team</p>
    </div>
</body>

</html>