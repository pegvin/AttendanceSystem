<script lang="ts">
	import { page } from "$app/state";
	import { pb, currentUser } from "$lib/pb.ts";
	import { Button } from "$lib/components/ui/button/index.ts";
	import * as Sidebar from "$lib/components/ui/sidebar/index.ts";
	import { LogOut as LogoutIcon } from "lucide-svelte";

	enum Visibility {
		Admin = 0,
		Teacher,
		Student,
		Invalid
	};

	function RoleToVisibility(role: string) : Visibility {
		switch (role.toLowerCase()) {
			case "admin":   return Visibility.Admin; break;
			case "teacher": return Visibility.Teacher; break;
			case "student": return Visibility.Student; break;
			default:        return Visibility.Invalid; break;
		}
	}

	interface GroupContent {
		Label: string,
		Link: string
	};
	interface Group {
		Label: string,
		For: Visibility,
		Content: GroupContent[];
	};

	const Groups : Group[] = [
		{
			Label: "Admin Dashboard",
			For: Visibility.Admin,
			Content: [
				{ Label: "Home", Link: "/" },
				{ Label: "Manage Teachers", Link: "/admin/teachers/" },
				{ Label: "Manage Students", Link: "/admin/students/" },
				{ Label: "Manage Courses", Link: "/admin/courses/" },
			]
		},
		{
			Label: "Teacher Dashboard",
			For: Visibility.Teacher,
			Content: [
				{ Label: "Home", Link: "/" },
				{ Label: "Manage Attendance", Link: "/teacher/attendance/" },
			]
		},
		{
			Label: "Student Dashboard",
			For: Visibility.Student,
			Content: [
				{ Label: "Home", Link: "/" },
				{ Label: "View Attendance", Link: "/student/attendance/" },
			]
		}
	];
</script>

<Sidebar.Root>
	<Sidebar.Header />
	<Sidebar.Content>
		{#if $currentUser}
			{#each Groups as Group}
				{#if Group.For == RoleToVisibility($currentUser.role)}
					<Sidebar.Group>
						<Sidebar.GroupLabel>{Group.Label}</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{#each Group.Content as Content}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton isActive={page.url.pathname == Content.Link}>
											<a class="w-full" href={Content.Link}>{Content.Label}</a>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				{/if}
			{/each}
		{/if}
	</Sidebar.Content>
	<Sidebar.Footer>
		<Button onclick={() => pb.authStore.clear()} variant="outline">
			<LogoutIcon />
			Logout
		</Button>
	</Sidebar.Footer>
</Sidebar.Root>
