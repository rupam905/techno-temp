"use client"

import { useState } from "react"
import Head from "@/components/Head"
/*import Footer from "@/components/Footer"*/
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

const TeamRegistration = () => {
  const [teamName, setTeamName] = useState("")
  const [isTeamSaved, setIsTeamSaved] = useState(false)
  const [participantId, setParticipantId] = useState("")
  const [teamMembers, setTeamMembers] = useState([
    { id: "leader", name: "Team Leader (You)", role: "", status: "accepted" },
  ])
  const [sentRequests, setSentRequests] = useState([])

  const availableRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Mobile Developer",
    "Database Administrator",
    "Quality Assurance Engineer",
  ]

  const handleSaveTeam = () => {
    if (teamName.trim()) {
      setIsTeamSaved(true)
    }
  }

  const handleSendRequest = () => {
    if (participantId.trim() && sentRequests.length < 6) {
      const newMember = {
        id: participantId,
        name: `Member ${teamMembers.filter((m) => m.id !== "leader").length + 1}`,
        role: "",
        status: "pending",
      }

      setTeamMembers([...teamMembers, newMember])
      setSentRequests([...sentRequests, participantId])

      setTimeout(() => {
        setTeamMembers((prev) =>
          prev.map((member) => (member.id === participantId ? { ...member, status: "accepted" } : member)),
        )
      }, 2000)

      setParticipantId("")
    }
  }

  const handleRoleAssignment = (memberId, role) => {
    setTeamMembers(teamMembers.map((member) => (member.id === memberId ? { ...member, role } : member)))
  }

  const getAvailableRoles = (currentMemberId) => {
    const assignedRoles = teamMembers
      .filter((member) => member.id !== currentMemberId && member.role)
      .map((member) => member.role)

    return availableRoles.filter((role) => !assignedRoles.includes(role))
  }

  const acceptedMembers = teamMembers.filter((member) => member.status === "accepted")
  const canProceed = acceptedMembers.length >= 5 && acceptedMembers.every((member) => member.role.trim() !== "")

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#242424" }}>
      <Head />

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">AI- UNLEASHED</h2>
            <p className="text-purple-300 text-lg">Team Registration</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-lg p-8 border border-white/10 shadow-2xl">
            {!isTeamSaved ? (
              <div className="space-y-8">
                <div>
                  <label className="block text-white text-lg font-semibold mb-4">ENTER TEAM NAME</label>
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/30 transition-all duration-200"
                      placeholder="Enter your team name"
                    />
                    <Button
                      onClick={handleSaveTeam}
                      disabled={!teamName.trim()}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 transition-all duration-200 disabled:opacity-50"
                    >
                      SAVE
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-white text-lg font-semibold">ADD MEMBER</h3>
                    <Plus className="w-5 h-5 text-white" />
                    <span className="text-white/70 text-sm">(Max 6 Members)</span>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">PARTICIPANT ID</label>
                    <div className="flex gap-4">
                      <Input
                        type="text"
                        value={participantId}
                        onChange={(e) => setParticipantId(e.target.value)}
                        className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/30 transition-all duration-200"
                        placeholder="Enter participant ID"
                      />
                      <Button
                        onClick={handleSendRequest}
                        disabled={!participantId.trim() || sentRequests.length >= 6}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-6 transition-all duration-200 disabled:opacity-50"
                      >
                        SEND REQUEST
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-8">
                  <Button
                    disabled={true}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 text-white/50 px-8 py-2 cursor-not-allowed"
                  >
                    Save and next →
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <label className="block text-white text-lg font-semibold mb-4">TEAM NAME</label>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md px-4 py-3 text-white">
                    {teamName}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-white text-lg font-semibold">ADD MEMBER</h3>
                    <Plus className="w-5 h-5 text-white" />
                    <span className="text-white/70 text-sm">(Max 6 Members)</span>
                  </div>

                  {teamMembers.filter((member) => member.status === "pending").length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-white/70 text-sm font-medium mb-3">Pending Requests:</h4>
                      <div className="space-y-2">
                        {teamMembers
                          .filter((member) => member.status === "pending")
                          .map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between backdrop-blur-sm border rounded-lg p-3"
                              style={{ backgroundColor: "#8B5FBF", borderColor: "#7C4FB3" }}
                            >
                              <span className="text-white font-medium">{member.name}</span>
                              <span className="text-purple-100 text-sm">Waiting for acceptance...</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    {acceptedMembers.map((member, index) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4"
                        style={{ position: "relative", zIndex: acceptedMembers.length - index }}
                      >
                        <span className="text-white font-medium">
                          {member.id === "leader" ? (
                            <>
                              {member.name} <span className="text-purple-300 text-sm">(Team Leader)</span>
                            </>
                          ) : (
                            member.name
                          )}
                        </span>
                        <div className="flex items-center gap-4" style={{ position: "relative", zIndex: 10 }}>
                          <Select value={member.role} onValueChange={(role) => handleRoleAssignment(member.id, role)}>
                            {({ isOpen, setIsOpen, value, onValueChange }) => (
                              <>
                                <SelectTrigger
                                  className="w-48 bg-white/10 backdrop-blur-sm border-white/20 text-white focus:bg-white/15 focus:border-white/30"
                                  isOpen={isOpen}
                                  setIsOpen={setIsOpen}
                                >
                                  <SelectValue placeholder="ASSIGN ROLE" value={value} />
                                </SelectTrigger>
                                <SelectContent
                                  className="bg-gray-900/90 backdrop-blur-md border-white/20 text-white"
                                  isOpen={isOpen}
                                >
                                  {getAvailableRoles(member.id).map((role) => (
                                    <SelectItem
                                      key={role}
                                      value={role}
                                      onValueChange={onValueChange}
                                      setIsOpen={setIsOpen}
                                      className="text-white hover:bg-white/10 focus:bg-white/10"
                                    >
                                      {role}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </>
                            )}
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>

                  {acceptedMembers.length < 6 && (
                    <div className="mt-6">
                      <label className="block text-white text-sm font-medium mb-2">PARTICIPANT ID</label>
                      <div className="flex gap-4">
                        <Input
                          type="text"
                          value={participantId}
                          onChange={(e) => setParticipantId(e.target.value)}
                          className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/30 transition-all duration-200"
                          placeholder="Enter participant ID"
                        />
                        <Button
                          onClick={handleSendRequest}
                          disabled={!participantId.trim() || sentRequests.length >= 6}
                          className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-6 transition-all duration-200 disabled:opacity-50"
                        >
                          SEND REQUEST
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center pt-8">
                  <Button
                    disabled={!canProceed}
                    className={`px-8 py-2 backdrop-blur-sm border transition-all duration-200 ${
                      canProceed
                        ? "bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30 text-white"
                        : "bg-white/5 border-white/10 text-white/50 cursor-not-allowed"
                    }`}
                  >
                    Save and next →
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-white/70 text-sm">
            <p>Team Members: {acceptedMembers.length}/6</p>
            <p>Minimum 5 members required to proceed</p>
            {acceptedMembers.length >= 5 && (
              <p>
                Roles assigned: {acceptedMembers.filter((member) => member.role.trim() !== "").length}/
                {acceptedMembers.length}
              </p>
            )}
          </div>
        </div>
      </main>

    </div>
  )
}

export default TeamRegistration
